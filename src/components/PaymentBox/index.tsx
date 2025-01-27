import { MaterialIcons } from "@expo/vector-icons";
import type React from "react";
import { View } from "react-native";
import { Name, ViewButton, ViewButtonDad } from "./styles";

interface PaymentButton {
  icon: string;
  text: string;
  color: string;
  children: React.ReactNode;
}

export function PaymentBox({ icon, text, color, children }: PaymentButton) {
  return (
    <ViewButtonDad>
      <ViewButton>
        <View style={{ flexDirection: "row"}}>
          <MaterialIcons name={icon} size={50} color={color} />
          <Name>{text}</Name>
        </View>
        <View>{children}</View>
      </ViewButton>
    </ViewButtonDad>
  );
}
