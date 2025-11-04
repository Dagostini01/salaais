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

type BottomTabParamList = {
  Materias: undefined;
  SignIn: undefined;
  Principal: undefined;
  Anac: undefined;
  Planos: undefined;
  Blocos: undefined;
  AnacFree: undefined;
  Configuracoes: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

const PERMISSION_COMUM = "COMUM";

export function Principal() {
  const navigation = useNavigation<NavigationProps>();
  const { user, setUser, getPermissionUser } = useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();

  const isCommon = useMemo(
    () => user?.permission === PERMISSION_COMUM,
    [user?.permission]
  );

  const navigateToSettings = useCallback(() => {
    navigation.navigate("Configuracoes");
  }, [navigation]);

  const navigateToAnac = useCallback(() => {
    navigation.navigate(isCommon ? "AnacFree" : "Anac");
  }, [navigation, isCommon]);

  const navigateToBlocos = useCallback(() => {
    navigation.navigate("Blocos");
  }, [navigation]);

  const navigateToMaterias = useCallback(() => {
    navigation.navigate("Materias");
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const fetchPermission = async () => {
        if (!user?.accessToken) return;
        try {
          const permission = await getPermissionUser(user.accessToken);
          if (!active) return;
          if (permission && permission !== user.permission) {
            setUser({ ...user, permission });
          }
        } catch (err) {
          console.error("error", err);
        }
      };
      fetchPermission();
      return () => {
        active = false;
      };
    }, [user?.accessToken, user?.permission, getPermissionUser, setUser, user])
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
                Seu acesso encerra em {`${12}`} dias
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
          <View>
            <NameTest>Simulado ANAC</NameTest>
            <LastNameTest>Último Simulado ANAC</LastNameTest>
          </View>
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
