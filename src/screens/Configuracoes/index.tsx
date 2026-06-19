import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PermissionType } from "../../utils/enums";
import { getExpoUpdateId } from "../../utils/expoUpdateInfo";
import {
  Avatar,
  AvatarRing,
  Container,
  Footer,
  FooterText,
  Header,
  HeaderBackButton,
  HeaderTitle,
  IconWrapper,
  MenuArrow,
  MenuContent,
  MenuDescription,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuTitle,
  PlanBadge,
  PlanBadgeText,
  PlanExpiry,
  PlanRow,
  ProfileCard,
  ProfileEmail,
  ProfileInfo,
  ProfileName,
  ScrollContent,
  SectionLabel,
} from "./styles";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/global/theme";

type BottomTabParamList = {
  Principal: undefined;
  Configuracoes: undefined;
};

type NavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Configuracoes"
>;

type MenuItemConfig = {
  icon: React.ComponentProps<typeof MenuIcon>["name"];
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
  onPress: () => void;
  danger?: boolean;
  loading?: boolean;
};

export const Configuracoes = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user, signOut, deleteAccount, getDiasRestantes, setUser } =
    useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [expoUpdateId, setExpoUpdateId] = useState(() => getExpoUpdateId());
  const url = `${process.env.EXPO_PUBLIC_WEB_URL}/home/configuracoes?token=${user?.accessToken}`;
  const url2 = "https://sandwiche.me/canalsalaais";

  const isCommon = useMemo(
    () => user?.permission === PermissionType.COMUM,
    [user?.permission],
  );

  useFocusEffect(
    useCallback(() => {
      setExpoUpdateId(getExpoUpdateId());
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const fetchDias = async () => {
        if (!user?.accessToken || isCommon) return;
        try {
          const dias = await getDiasRestantes(user.accessToken);
          if (active && dias !== user.diasRestantes) {
            setUser({ ...user, diasRestantes: dias });
          }
        } catch (error) {
          console.error("Erro ao buscar dias restantes:", error);
        }
      };

      fetchDias();
      return () => {
        active = false;
      };
    }, [user, isCommon, getDiasRestantes, setUser]),
  );

  const handleGoHome = useCallback(() => {
    navigation.navigate("Principal");
  }, [navigation]);

  const handlePressLinking = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não é possível abrir o link");
    }
  }, [url]);

  const handlePressLinking2 = useCallback(async () => {
    const supported = await Linking.canOpenURL(url2);
    if (supported) {
      await Linking.openURL(url2);
    } else {
      Alert.alert("Erro", "Não é possível abrir o link");
    }
  }, []);

  const confirmDeleteAccount = useCallback(async () => {
    setIsDeletingAccount(true);
    try {
      await deleteAccount();
      Alert.alert(
        "Conta excluída",
        "Sua conta e dados foram removidos com sucesso.",
      );
    } catch (error) {
      Alert.alert(
        "Não foi possível excluir",
        error instanceof Error
          ? error.message
          : "Tente novamente ou entre em contato com o suporte.",
      );
    } finally {
      setIsDeletingAccount(false);
    }
  }, [deleteAccount]);

  const handleDeleteAccount = useCallback(() => {
    if (isDeletingAccount) return;

    const subscriptionWarning = !isCommon
      ? "\n\nSeu plano pago não é cancelado automaticamente. Cancele pelo site ou fale com o suporte antes de excluir."
      : "";

    Alert.alert(
      "Excluir conta?",
      `Todos os seus dados serão removidos permanentemente. Essa ação não pode ser desfeita.${subscriptionWarning}`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Continuar",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirma exclusão?",
              "Sua conta será apagada e você será desconectado do app.",
              [
                { text: "Voltar", style: "cancel" },
                {
                  text: "Excluir definitivamente",
                  style: "destructive",
                  onPress: () => {
                    void confirmDeleteAccount();
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }, [confirmDeleteAccount, isCommon, isDeletingAccount]);

  const menuItems: MenuItemConfig[] = [
    {
      icon: "user",
      iconColor: theme.colors.secondary,
      iconBackground: theme.colors.secondary_light,
      title: "Ver sua conta",
      description: "Gerencie suas informações e preferências",
      onPress: handlePressLinking,
    },
    {
      icon: "headphones",
      iconColor: theme.colors.anac,
      iconBackground: theme.colors.anac_light,
      title: "Suporte",
      description: "Entre em contato para obter ajuda",
      onPress: handlePressLinking2,
    },
  ];

  const dangerItems: MenuItemConfig[] = [
    {
      icon: "log-out",
      iconColor: theme.colors.attention,
      iconBackground: "rgba(232, 63, 91, 0.12)",
      title: "Sair",
      description: "Fazer logout da sua conta",
      danger: true,
      onPress: () =>
        Alert.alert("Realmente deseja sair?", "", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sair",
            onPress: async () => await signOut(),
            style: "destructive",
          },
        ]),
    },
    {
      icon: "trash-2",
      iconColor: theme.colors.attention,
      iconBackground: "rgba(232, 63, 91, 0.12)",
      title: "Excluir conta",
      description: isDeletingAccount
        ? "Excluindo sua conta..."
        : "Remover permanentemente sua conta",
      danger: true,
      loading: isDeletingAccount,
      onPress: handleDeleteAccount,
    },
  ];

  const renderMenuItem = (item: MenuItemConfig, bordered: boolean) => (
    <MenuItem
      key={item.title}
      onPress={item.onPress}
      activeOpacity={0.7}
      $bordered={bordered}
      disabled={item.loading}
    >
      <IconWrapper $background={item.iconBackground}>
        {item.loading ? (
          <ActivityIndicator size="small" color={item.iconColor} />
        ) : (
          <MenuIcon name={item.icon} $color={item.iconColor} />
        )}
      </IconWrapper>
      <MenuContent>
        <MenuTitle $danger={item.danger}>{item.title}</MenuTitle>
        <MenuDescription>{item.description}</MenuDescription>
      </MenuContent>
      {!item.loading && <MenuArrow name="chevron-right" />}
    </MenuItem>
  );

  if (!user) return null;

  return (
    <Container>
      <Header style={{ paddingTop: top + 8 }}>
        <TouchableOpacity onPress={handleGoHome} activeOpacity={0.7}>
          <HeaderBackButton name="chevron-left" />
        </TouchableOpacity>
        <HeaderTitle>Configurações</HeaderTitle>
      </Header>

      <ScrollContent contentContainerStyle={{ paddingBottom: bottom + 24 }}>
        <ProfileCard>
          <AvatarRing>
            <Avatar
              source={
                user.photoUrl
                  ? { uri: user.photoUrl }
                  : require("../../assets/user.png")
              }
            />
          </AvatarRing>
          <ProfileInfo>
            <ProfileName>{user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
            <PlanRow>
              <PlanBadge>
                <PlanBadgeText>
                  {isCommon ? "Demonstração" : `CMS ${user.permission}`}
                </PlanBadgeText>
              </PlanBadge>
              {!isCommon && user.diasRestantes != null && (
                <PlanExpiry>{user.diasRestantes} dias restantes</PlanExpiry>
              )}
            </PlanRow>
          </ProfileInfo>
        </ProfileCard>

        <SectionLabel>GERAL</SectionLabel>
        <MenuGroup>
          {menuItems.map((item, index) =>
            renderMenuItem(item, index < menuItems.length - 1),
          )}
        </MenuGroup>

        <SectionLabel>CONTA</SectionLabel>
        <MenuGroup>
          {dangerItems.map((item, index) =>
            renderMenuItem(item, index < dangerItems.length - 1),
          )}
        </MenuGroup>

        <Footer>
          <FooterText selectable>Sala AIS · {expoUpdateId}</FooterText>
        </Footer>
      </ScrollContent>
    </Container>
  );
};
