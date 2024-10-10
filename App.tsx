import React from "react";
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/global/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/contexts/auth";
import * as WebBrowser from "expo-web-browser";
import { StripeProvider } from "@stripe/stripe-react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <GestureHandlerRootView>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      >
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </NavigationContainer>
        </ThemeProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
