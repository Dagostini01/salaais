import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./src/contexts/auth";
import theme from "./src/global/global/theme";
import { AppRoutes } from "./src/routes/app.routes";

WebBrowser.maybeCompleteAuthSession();

const linking = {
  prefixes: ["salaais://"],
  config: {
    screens: {
      SignIn: "signin",
    },
  },
};

const key = process.env.EXPO_PUBLIC_IS_DEV === 'true'
  ?(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST as string)
  : (process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_PUBLISH as string);

export default function App() {
  return (
    <GestureHandlerRootView>
      <StripeProvider
        publishableKey={key}
        merchantIdentifier={`${process.env.EXPO_PUBLIC_MERCHANT}`}
      >
        <ThemeProvider theme={theme}>
          <NavigationContainer linking={linking}>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </NavigationContainer>
        </ThemeProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
