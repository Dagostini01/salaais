import React, { useState } from "react";
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    LastTest,
    NameTest,
    TestAnac,
    LastNameTest,
    CardsTest,
    NameCardTest,
    HighlightCards,
} from "./styles";

import { CardImage } from "../../components/CardImage";
import { CirclePercentage } from "../../components/CirclePercentage";
import { Card } from "../../components/Card";
import { ButtonOpacity } from "../../components/ButtonOpacity";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Define os tipos de navegação
type BottomTabParamList = {
    Materias: undefined;
    SignIn: undefined;
    Principal: undefined;
    Quiz: undefined;
    Planos: undefined;
    Blocos: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, 'Principal'>;

export function Principal() {
    const navigation = useNavigation<NavigationProps>();
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/87324617?v=4' }} />
                        <User>
                            <UserGreeting>Olá Pedro!</UserGreeting>
                            <UserName>Pronto para decolar?</UserName>
                        </User>
                    </UserInfo>
                    <Icon name='power' />
                </UserWrapper>

            </Header>
            <CardsTest>
                <NameCardTest>Realizar Simulado</NameCardTest>
                <HighlightCards>
                    <CardImage onPress={() => navigation.navigate('Quiz')} imageUrl="https://logodownload.org/wp-content/uploads/2018/06/anac-logo.png" />
                    <Card onPress={() => navigation.navigate('Blocos')}  title="Blocos" iconName="book" />
                    <Card onPress={() => navigation.navigate('Materias')} title="Matérias" iconName="menu-book" />
                </HighlightCards>
            </CardsTest>
            <ButtonOpacity onPress={() => navigation.navigate('Planos')} text="Contratar Planos" icon="shopping-bag" />
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
