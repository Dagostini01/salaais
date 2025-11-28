import React, { useCallback, useContext, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Card } from "../../components/Card";
import { CardImage } from "../../components/CardImage";
import { CirclePercentage } from "../../components/CirclePercentage";
import {
  CardsTest,
  Container,
  Header,
  HighlightCards,
  Icon,
  LastNameTest,
  LastTest,
  LastTestContent,
  NameCardTest,
  NameTest,
  Photo,
  TextViewPlano,
  TitleViewPlano,
  UserGreeting,
  UserInfo,
  UserName,
  ViewPlano,
  UserInfoContent,
  SubscriptionInfo,
  SubscriptionInfoText,
  SubscriptionInfoTextTime,
  SubscriptionInfoRow,
  SubscriptionInfoLeft,
  SubscriptionBadge,
  SubscriptionBadgeText,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ANAC_LOGO from "../../assets/anac-logo.png";
import { PermissionType } from "../../utils/enums";

type BottomTabParamList = {
  Materias: undefined;
  SignIn: undefined;
  Principal: undefined;
  Anac: undefined;
  Planos: undefined;
  Blocos: undefined;
  Configuracoes: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Principal() {
  const navigation = useNavigation<NavigationProps>();
  const { user, setUser, getPermissionUser, getDiasRestantes } =
    useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();

  const isCommon = useMemo(
    () => user?.permission === PermissionType.COMUM,
    [user?.permission]
  );

  const handleNavigate = useCallback(
    (route: keyof BottomTabParamList) => {
      navigation.navigate(route);
    },
    [navigation]
  );

  const navigateToSettings = () => handleNavigate("Configuracoes");
  const navigateToAnac = () => handleNavigate("Anac");
  const navigateToBlocos = () => handleNavigate("Blocos");
  const navigateToMaterias = () => handleNavigate("Materias");

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const fetchPermission = async () => {
        if (!user?.accessToken) return;
        try {
          const permission = await getPermissionUser(user.accessToken);
          const dias = await getDiasRestantes(user.accessToken);
          if (!active) return;
          if (permission && permission !== user.permission) {
            setUser({ ...user, permission });
          }
          if (dias && dias !== user.diasRestantes) {
            setUser({ ...user, diasRestantes: dias });
          }
        } catch (err) {
          console.error("error", err);
        }
      };
      fetchPermission();
      return () => {
        active = false;
      };
    }, [
      user?.accessToken,
      user?.permission,
      getPermissionUser,
      setUser,
      user,
      getDiasRestantes,
    ])
  );

  if (user == null) return null;

  return (
    <>
      <Header style={{ paddingTop: top * 1.25 }}>
        <UserInfo>
          <UserInfoContent>
            <Photo
              source={
                user.photoUrl
                  ? { uri: user.photoUrl }
                  : require("../../assets/user.png")
              }
            />
            <View>
              <UserGreeting>Olá {user.name}!</UserGreeting>
              <UserName>Pronto para decolar?</UserName>
            </View>
          </UserInfoContent>
          <TouchableOpacity onPress={navigateToSettings}>
            <Icon name="settings" />
          </TouchableOpacity>
        </UserInfo>
        <SubscriptionInfo>
          <SubscriptionInfoRow>
            <SubscriptionInfoLeft>
              <SubscriptionInfoText>Plano Atual</SubscriptionInfoText>
              <SubscriptionInfoTextTime>
                {isCommon
                  ? "Acesso Gratuito"
                  : `Seu acesso encerra em ${user.diasRestantes ?? 0} dias`}
              </SubscriptionInfoTextTime>
            </SubscriptionInfoLeft>
            <SubscriptionBadge>
              <SubscriptionBadgeText>
                CMS {user.permission}
              </SubscriptionBadgeText>
            </SubscriptionBadge>
          </SubscriptionInfoRow>
        </SubscriptionInfo>
      </Header>
      <Container>
        <CardsTest>
          <NameCardTest>Realizar Simulado</NameCardTest>
          <HighlightCards>
            <CardImage onPress={navigateToAnac} imageUrl={ANAC_LOGO} />
            {!isCommon && (
              <>
                <Card
                  onPress={navigateToBlocos}
                  title="Blocos"
                  iconName="book"
                />
                <Card
                  onPress={navigateToMaterias}
                  title="Matérias"
                  iconName="menu-book"
                />
              </>
            )}
          </HighlightCards>
        </CardsTest>

        <LastTest>
          <CirclePercentage />
          <LastTestContent>
            <NameTest>Simulado ANAC</NameTest>
            <LastNameTest>Último Simulado ANAC</LastNameTest>
          </LastTestContent>
        </LastTest>

        {isCommon && (
          <ViewPlano style={{ marginBottom: bottom }}>
            <TitleViewPlano>
              Você está na versão de demonstração.
            </TitleViewPlano>
            <TextViewPlano>
              Com ela, você pode realizar uma prova modelo gratuitamente. Para
              liberar todos os recursos e se preparar com eficiência para a
              ANAC, adquira um plano de estudos clicando no ícone de
              configurações e veja sua conta.
            </TextViewPlano>
          </ViewPlano>
        )}
      </Container>
    </>
  );
}
