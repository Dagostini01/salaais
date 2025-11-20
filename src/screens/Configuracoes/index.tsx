import React, { useCallback, useContext } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PermissionType } from "../../utils/enums";
import {
  Avatar,
  Container,
  Content,
  Header,
  HeaderBackButton,
  HeaderTitle,
  MenuArrow,
  MenuContent,
  MenuDescription,
  MenuIcon,
  MenuIconDanger,
  MenuItem,
  MenuItemDanger,
  MenuList,
  MenuListDanger,
  MenuTitle,
  MenuTitleDanger,
  ProfileInfo,
  ProfileName,
  ProfileSection,
  ProfileSubtitle,
} from "./styles";
import { AuthContext } from "../../contexts/auth";
import { deleteUser } from "../../services";

type BottomTabParamList = {
  Principal: undefined;
  Configuracoes: undefined;
};

type NavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Configuracoes"
>;

export const Configuracoes = () => {
  const navigation = useNavigation<NavigationProps>();
  const { user, signOut } = useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();
  const url = `${process.env.EXPO_PUBLIC_WEB_URL}/home/configuracoes?token=${user?.accessToken}`;
  const url2 = "https://sandwiche.me/canalsalaais";

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

  const menuItems = [
    {
      icon: "user" as const,
      title: "Ver sua conta",
      description: "Gerencie suas informações e preferências",
      onPress: handlePressLinking,
      isDanger: false,
    },
    {
      icon: "headphones" as const,
      title: "Suporte",
      description: "Entre em contato para obter ajuda",
      onPress: handlePressLinking2,
      isDanger: false,
    },
  ];

  const dangerItems = [
    {
      icon: "log-out" as const,
      title: "Sair",
      description: "Fazer logout da sua conta",
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
      icon: "trash-2" as const,
      title: "Excluir conta",
      description: "Remover permanentemente sua conta",
      onPress: () =>
        Alert.alert(
          "Realmente deseja excluir sua conta?",
          "Essa ação é irreversível",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Excluir",
              onPress: () => {
                deleteUser(user?.accessToken ?? "", user?.id ?? 0);
              },
              style: "destructive",
            },
          ]
        ),
    },
  ];

  const getPermissionLabel = (permission?: string) => {
    if (!permission || permission === PermissionType.COMUM) {
      return "Usuário Comum";
    }
    return `Plano ${permission}`;
  };

  if (!user) return null;

  return (
    <Container>
      <Header style={{ paddingTop: top * 1.25 }}>
        <TouchableOpacity onPress={handleGoHome} activeOpacity={0.7}>
          <HeaderBackButton name="chevron-left" />
        </TouchableOpacity>
        <HeaderTitle>Configurações</HeaderTitle>
      </Header>
      <ProfileSection>
        <Avatar
          source={
            user.photoUrl
              ? { uri: user.photoUrl }
              : require("../../assets/user.png")
          }
        />
        <ProfileInfo>
          <ProfileName>{user.name}</ProfileName>
          <ProfileSubtitle>
            {getPermissionLabel(user.permission)}
          </ProfileSubtitle>
        </ProfileInfo>
      </ProfileSection>

      <Content>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem
              key={item.title}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <MenuIcon name={item.icon} />
              <MenuContent>
                <MenuTitle>{item.title}</MenuTitle>
                <MenuDescription>{item.description}</MenuDescription>
              </MenuContent>
              <MenuArrow name="chevron-right" />
            </MenuItem>
          ))}
        </MenuList>
        <MenuListDanger style={{ marginBottom: bottom }}>
          {dangerItems.map((item) => (
            <MenuItemDanger
              key={item.title}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <MenuIconDanger name={item.icon} />
              <MenuContent>
                <MenuTitleDanger>{item.title}</MenuTitleDanger>
                <MenuDescription>{item.description}</MenuDescription>
              </MenuContent>
              <MenuArrow name="chevron-right" />
            </MenuItemDanger>
          ))}
        </MenuListDanger>
      </Content>
    </Container>
  );
};
