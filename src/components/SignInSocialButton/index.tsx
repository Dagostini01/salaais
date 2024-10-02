import React from "react";
import { Button, ImageContainer, Text } from "./styles";
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
    onPress: ()=>void;
}

export function SignInSocialButton({ title, svg: Svg, onPress, ...rest }: Props) {
    return (
        <Button {...rest} onPress={onPress} style={{borderRadius: 15}}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Text>
                {title}
            </Text>
        </Button>
    );
}