import React, { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { deleteUser } from "../../services";
import { Container, styles } from "./styles";

export const Configuracoes = () => {
  const { user, signOut } = useContext(AuthContext);

  const onPress = (action: "sair" | "excluir") => {
    if (user?.token) {
      if (action === "sair") {
        Alert.alert("Realmente deseja sair?", "", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sair",
            onPress: signOut,
            style: "destructive",
          },
        ]);
      } else if (action === "excluir") {
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
                deleteUser(user.token, user?.id);
              },
              style: "destructive",
            },
          ],
        );
      }
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.roundedButton}
          onPress={() => onPress("sair")}
        >
          <Text style={styles.text}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundedButton}
          onPress={() => onPress("excluir")}
        >
          <Text style={styles.text}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
