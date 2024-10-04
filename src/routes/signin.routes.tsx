import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../screens";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export const SignInRoutes = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='SignIn' component={SignIn} />
    </Stack.Navigator>
  );
};
