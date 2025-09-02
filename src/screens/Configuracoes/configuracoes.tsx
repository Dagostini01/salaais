import React, { useCallback, useContext } from "react";

import {
  Alert,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container, styles } from "./styles";

import { AuthContext } from "../../contexts/auth";
import { deleteUser } from "../../services";

export const Configuracoes = () => {
  const { user, signOut } = useContext(AuthContext);
  const url = `https://salaais.vercel.app/settings?token=${user?.accessToken}`;
  const url2 = `https://sandwiche.me/canalsalaais`;

  const handlePressLinking = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não é possível abrir o link");
    }
  }, [url]);

  const handlePressLinking2 = useCallback(async () => {
    const supported = await Linking.canOpenURL(url2);
    if (supported) {
      await Linking.openURL(url2);
    } else {
      Alert.alert("Erro", "Não é possível abrir o link");
    }
  }, [url]);

  const dataButtons = [
    {
      text: "Ver sua conta",
      colorText: "#000000",
      color: "#fbd434",
      onPress: handlePressLinking,
    },
    {
      text: "Suporte",
      colorText: "#000000",
      color: "#fbd434",
      onPress: handlePressLinking2,
    },
    {
      text: "Sair",
      color: "#990000",
      onPress: () =>
        Alert.alert("Realmente deseja sair?", "", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sair",
            onPress: async () => await signOut(),
            style: "destructive",
          },
        ]),
    },
    {
      text: "Excluir",
      color: "#990000",
      onPress: () =>
        Alert.alert(
          "Realmente deseja excluir sua conta?",
          "Essa ação é irreversível",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Excluir",
              onPress: () => {
                deleteUser(user?.token ?? "", user?.id ?? 0);
              },
              style: "destructive",
            },
          ]
        ),
    },
  ];

  return (
    <Container>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </SafeAreaView>
      <View style={styles.content}>
        {dataButtons.map((i) => (
          <TouchableOpacity
            style={[styles.roundedButton, { backgroundColor: i.color }]}
            onPress={i.onPress}
            key={i.text}
          >
            <Text style={[styles.text, { color: i.colorText ?? "white" }]}>
              {i.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};
