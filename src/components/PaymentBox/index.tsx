import React from "react";
import { ViewButtonDad, ViewButton, Name } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

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
                <View style={{flexDirection: "row"}}>
                    <MaterialIcons name={icon} size={50} color={color} />
                    <Name>{text}</Name>
                </View>
                <View>
                    {children}
                </View>
            </ViewButton>
        </ViewButtonDad>
    );
}