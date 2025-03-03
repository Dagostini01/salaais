import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  Blocos,
  Configuracoes,
  Materias,
  Planos,
  Principal,
  Quiz,
} from "../screens";
import { QuizFree } from "../screens/QuizFree";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export const CommomRoutes = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Planos" component={Planos} />
      <Stack.Screen name="Blocos" component={Blocos} />
      <Stack.Screen name="Materias" component={Materias} />
      <Stack.Screen name="QuizFree" component={QuizFree} />
      <Stack.Screen name="Configuracoes" component={Configuracoes} />
    </Stack.Navigator>
  );
};
