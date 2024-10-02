import React from "react";
import { LastTest, TestAnac, NameTest } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../global/global/theme";

interface ButtonOpacityProps {
    text: string;
    icon: string;
}

export function ButtonPayment({ text, icon }: ButtonOpacityProps) {
    return (
        <LastTest>
            <TestAnac>
                <MaterialIcons name={icon} size={30} color={theme.colors.shape}/>
                <NameTest>{text}</NameTest>
            </TestAnac>
        </LastTest>
    );
}