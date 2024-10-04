import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SignIn } from "../screens";

const Stack = createNativeStackNavigator();
const screenOptions = { headerShown: false };

export const SignInRoutes = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};
