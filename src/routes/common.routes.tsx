import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  Anac,
  Blocos,
  Configuracoes,
  Materias,
  Planos,
  Principal,
} from "../screens";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export const CommomRoutes = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Anac" component={Anac} />
      <Stack.Screen name="Planos" component={Planos} />
      <Stack.Screen name="Blocos" component={Blocos} />
      <Stack.Screen name="Materias" component={Materias} />
      <Stack.Screen name="Configuracoes" component={Configuracoes} />
    </Stack.Navigator>
  );
};
