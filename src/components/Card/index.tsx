import React from "react";
import {
    Container,
    CardText,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../global/global/theme";

interface CardsProps {
    title?: string;
    iconName?: string;
    onPress: ()=>void;
}

export function Card({ iconName, title, onPress }: CardsProps) {
    return (
        <Container onPress={onPress}>
            <MaterialIcons name={iconName} color={theme.colors.text} size={50} />
            <CardText>{title}</CardText>
        </Container>
    )
}