import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import theme from "../../global/global/theme";
import { CardText, Container } from "./styles";

interface CardsProps {
  title?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap | string;
  onPress: () => void;
}

export function Card({ iconName, title, onPress }: CardsProps) {
  return (
    <Container onPress={onPress}>
      <MaterialIcons
        name={iconName as keyof typeof MaterialIcons.glyphMap}
        color={theme.colors.text}
        size={50}
      />
      <CardText>{title}</CardText>
    </Container>
  );
}
