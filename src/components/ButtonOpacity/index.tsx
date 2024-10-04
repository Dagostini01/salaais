import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import theme from "../../global/global/theme";
import { LastTest, NameTest, TestAnac } from "./styles";

interface ButtonOpacityProps {
  text: string;
  icon: string;
  onPress: () => void;
}

export function ButtonOpacity({ text, icon, onPress }: ButtonOpacityProps) {
  return (
    <LastTest onPress={onPress}>
      <TestAnac>
        <MaterialIcons name={icon} size={30} color={theme.colors.text} />
        <NameTest>{text}</NameTest>
      </TestAnac>
    </LastTest>
  );
}
