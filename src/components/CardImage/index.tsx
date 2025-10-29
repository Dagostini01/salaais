import React, { type JSX } from "react";
import { Container, Image } from "./styles";
import type { ImageSourcePropType } from "react-native";

interface CardsProps {
  imageUrl: ImageSourcePropType;
  onPress: () => void;
}

export function CardImage({ imageUrl, onPress }: CardsProps) {
  return (
    <Container onPress={onPress}>
      <Image source={imageUrl as ImageSourcePropType} />
    </Container>
  );
}
