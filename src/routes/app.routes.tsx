import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/auth";
import { CommomRoutes } from "./common.routes";
import { SignInRoutes } from "./signin.routes";

export const AppRoutes = () => {
  const { signed, getToken, loading } = useContext(AuthContext);

  // "signed" nas dependências para que a verificação do token aconteça quando mudar o estado de "signed"
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getToken();
  }, [signed]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={"large"} color={"#fbd434"} />
      </View>
    );
  }

  return signed ? <CommomRoutes /> : <SignInRoutes />;
};

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
