import React from "react";
import { Container, Image } from "./styles";

interface CardsProps {
  imageUrl: string | number;
  onPress: () => void;
}

export function CardImage({ imageUrl, onPress }: CardsProps) {
  return (
    <Container onPress={onPress}>
      <Image
        source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
      />
    </Container>
  );
}
