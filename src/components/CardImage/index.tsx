import React from "react";
import {
    Container,
    Image,
} from "./styles";

interface CardsProps {
    imageUrl?: string | undefined;
    onPress: ()=>void;
}

export function CardImage({ imageUrl, onPress }: CardsProps) {
    return (
        <Container onPress={onPress}>
            <Image source={{ uri: imageUrl }} />
        </Container>
    )
}