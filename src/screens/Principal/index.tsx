import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Card } from "../../components/Card";
import { CardImage } from "../../components/CardImage";
import { AuthContext } from "../../contexts/auth";
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
  TestAnac,
  TextViewPlano,
  TitleViewPlano,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  ViewPlano,
} from "./styles";
import { CirclePercentage } from "../../components/CirclePercentage";

// Define os tipos de navegação
type BottomTabParamList = {
  Materias: undefined;
  SignIn: undefined;
  Principal: undefined;
  Quiz: undefined;
  Planos: undefined;
  Blocos: undefined;
  QuizFree: undefined;
  Configuracoes: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Principal() {
  const navigation = useNavigation<NavigationProps>();
  const { user, setUser, getPermissionUser } = useContext(AuthContext);

  const getUser = useCallback(async () => {
    if (user?.accessToken !== undefined) {
      const permission = await getPermissionUser(user.accessToken);
      setUser({ ...user, permission });
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  if (user == null) return null;

  return (
    <Container>
      <Header>
        {/* <UserWrapper> */}
        <UserInfo>
          <User>
            {/* {user.photoUrl != undefined && ( */}
            <Photo
              source={
                user.photoUrl
                  ? { uri: user.photoUrl }
                  : require("../../assets/user.png")
              }
            />
            {/* )} */}
            <View style={{ flex: 1 }}>
              <UserGreeting>Olá {user.name}!</UserGreeting>
              <UserName>Pronto para decolar?</UserName>
            </View>
          </User>
          <TouchableOpacity
            onPress={() => navigation.navigate("Configuracoes")}
          >
            <Icon name="settings" />
          </TouchableOpacity>
        </UserInfo>
        {/* </UserWrapper> */}
      </Header>
      <CardsTest>
        <NameCardTest>Realizar Simulado</NameCardTest>
        <HighlightCards>
          <CardImage
            onPress={() =>
              user.permission === "COMUM"
                ? navigation.navigate("QuizFree")
                : navigation.navigate("Quiz")
            }
            imageUrl={require("../../assets/anac-logo.png")}
          />
          {user.permission !== "COMUM" && (
            <>
              <Card
                onPress={() => navigation.navigate("Blocos")}
                title="Blocos"
                iconName="book"
              />
              <Card
                onPress={() => navigation.navigate("Materias")}
                title="Matérias"
                iconName="menu-book"
              />
            </>
          )}
        </HighlightCards>
      </CardsTest>
      <LastTest>
        <CirclePercentage />
        <TestAnac>
          <NameTest>Simulado ANAC</NameTest>
          <LastNameTest>Último Simulado ANAC</LastNameTest>
        </TestAnac>
      </LastTest>
      {user.permission === "COMUM" && (
        <ViewPlano>
            <TitleViewPlano>Você está na versão de demonstração.</TitleViewPlano>
            <TextViewPlano>Com ela, você pode realizar uma prova modelo gratuitamente. Para liberar todos os recursos e se preparar com eficiência para a ANAC, adquira um plano de estudos clicando no ícone de configurações e veja sua conta.</TextViewPlano>
        </ViewPlano>
      )}
    </Container>
  );
}
