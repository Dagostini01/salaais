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

export default function App() {
  return (
    <GestureHandlerRootView>
      <StripeProvider
        publishableKey={
          process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
        }
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
