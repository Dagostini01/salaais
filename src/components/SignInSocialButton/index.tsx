import type React from "react";
import type { RectButtonProps } from "react-native-gesture-handler";
import type { SvgProps } from "react-native-svg";
import { Button, SideSlot, Text } from "./styles";

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
    <Button {...rest} onPress={onPress}>
      <SideSlot>
        <Svg width={22} height={22} />
      </SideSlot>
      <Text>{title}</Text>
      <SideSlot />
    </Button>
  );
}
