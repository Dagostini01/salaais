import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // Importa o hook useFocusEffect
import React, { useState, useCallback } from "react";
import theme from "../../global/global/theme"; // Certifique-se de importar o tema com as cores
import { Circle, TextInsideCircle } from "./styles";

export function CirclePercentage() {
  const [lastResult, setLastResult] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadLastResult = async () => {
        try {
          const savedResult = await AsyncStorage.getItem("lastQuizResult");
          if (savedResult !== null) {
            setLastResult(JSON.parse(savedResult));
          }
        } catch (error) {
          console.error("Erro ao carregar o resultado do quiz:", error);
        }
      };

      loadLastResult();
    }, []),
  );

  // Define a cor dinamicamente com base no resultado
  const getBackgroundColor = () => {
    if (lastResult === null) return theme.colors.secondary; // Valor padrão
    return lastResult >= 70 ? theme.colors.succes : theme.colors.attention;
  };

  return (
    <Circle backgroundColor={getBackgroundColor()}>
      <TextInsideCircle>
        {lastResult !== null ? `${lastResult.toFixed(0)}%` : "Nenhum Resultado"}
      </TextInsideCircle>
    </Circle>
  );
}
