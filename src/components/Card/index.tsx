import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import theme from "../../global/global/theme";
import { CardText, Container, IconCircle } from "./styles";

interface CardsProps {
  title?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap | string;
  onPress: () => void;
}

export function Card({ iconName, title, onPress }: CardsProps) {
  return (
    <Container onPress={onPress}>
      <IconCircle>
        <MaterialIcons
          name={iconName as keyof typeof MaterialIcons.glyphMap}
          color={theme.colors.title}
          size={36}
        />
      </IconCircle>
      <CardText>{title}</CardText>
    </Container>
  );
}
