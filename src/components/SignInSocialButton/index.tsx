import type React from "react";
import type { RectButtonProps } from "react-native-gesture-handler";
import type { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Text } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
  onPress: () => void;
}

export function SignInSocialButton({
  title,
  svg: Svg,
  onPress,
  ...rest
}: Props) {
  return (
    <Button {...rest} onPress={onPress} style={{ borderRadius: 15 }}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}
