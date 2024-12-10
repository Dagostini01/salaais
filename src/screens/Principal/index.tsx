import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { ButtonOpacity } from "../../components/ButtonOpacity";
import { Card } from "../../components/Card";
import { CardImage } from "../../components/CardImage";
import { CirclePercentage } from "../../components/CirclePercentage";
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
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

// Define os tipos de navegação
type BottomTabParamList = {
  Materias: undefined;
  SignIn: undefined;
  Principal: undefined;
  Quiz: undefined;
  Planos: undefined;
  Blocos: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function Principal() {
  const navigation = useNavigation<NavigationProps>();
  const { user, signOut } = useContext(AuthContext);

  const logout = () => {
    Alert.alert("Realmente deseja sair?", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: signOut,
        style: "destructive",
      },
    ]);
  };

  if (user == null) return null;

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: `${user.photoUrl}`,
              }}
            />
            <User>
              <UserGreeting>Olá {user.name}!</UserGreeting>
              <UserName>Pronto para decolar?</UserName>
            </User>
          </UserInfo>
          <TouchableOpacity onPress={logout}>
            <Icon name="power" />
          </TouchableOpacity>
        </UserWrapper>
      </Header>
      <CardsTest>
        <NameCardTest>Realizar Simulado</NameCardTest>
        <HighlightCards>
          <CardImage
            onPress={() => navigation.navigate("Quiz")}
            imageUrl="https://logodownload.org/wp-content/uploads/2018/06/anac-logo.png"
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
      <ButtonOpacity
        onPress={() => navigation.navigate("Planos")}
        text="Contratar Planos"
        icon="shopping-bag"
      />
      <LastTest>
        <CirclePercentage />
        <TestAnac>
          <NameTest>Simulado ANAC</NameTest>
          <LastNameTest>Último Simulado ANAC</LastNameTest>
        </TestAnac>
      </LastTest>
    </Container>
  );
}
