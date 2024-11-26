import { useStripe } from "@stripe/stripe-react-native";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ButtonPayment } from "../../components/ButtonPayment";
import { PaymentBox } from "../../components/PaymentBox";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/global/theme";
import { paymentSheetParams } from "../../services";
import {
  HighlightPayments,
  LoadingContainer,
  Payments,
  TextPayment,
} from "./styles";

export function Planos() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async (
    plan: "BRONZE" | "PRATA" | "OURO" | "PREMIUM",
  ) => {
    setLoading(true);
    const { customer, ephemeralKey, paymentIntent } = await paymentSheetParams(
      user?.accessToken ?? "",
      plan,
    );

    const { error } = await initPaymentSheet({
      merchantDisplayName: user?.name ?? "",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    console.log(error)
    setLoading(false);
    await openPaymentSheet();
    if (error) {
      console.log("error", error.code, error.message);
      Alert.alert(`Houve um problema: ${error.code}`, error.message);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    console.log(error)
    if (error) {
      Alert.alert(`Houve um problema: ${error.code}`, error.message);
    } else {
      Alert.alert("Sucesso", "Sua compra foi concluída!");
    }
  };

  return (
    <Payments>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      )}
      <HighlightPayments>
        <PaymentBox
          icon="emoji-events"
          text="Premium"
          color={theme.colors.attention}
        >
          <TextPayment>
            - Acesso aos simulados da ANAC e simulados de estudos divididos por
            blocos e matérias durante 120 dias corridos.
          </TextPayment>
          <ButtonPayment
            icon="local-atm"
            text="R$93,90 - Contratar"
            onPress={() => initializePaymentSheet("PREMIUM")}
          />
        </PaymentBox>

        <PaymentBox
          icon="emoji-events"
          text="Ouro"
          color={theme.colors.primary}
        >
          <TextPayment>
            - Acesso aos simulados da ANAC e simulados de estudos divididos por
            blocos e matérias durante 90 dias corridos.
          </TextPayment>
          <ButtonPayment
            icon="local-atm"
            text="R$73,90 - Contratar"
            onPress={() => initializePaymentSheet("OURO")}
          />
        </PaymentBox>

        <PaymentBox icon="emoji-events" text="Prata" color={theme.colors.text}>
          <TextPayment>
            - Acesso aos simulados da ANAC e simulados de estudos divididos por
            blocos e matérias durante 60 dias corridos.
          </TextPayment>
          <ButtonPayment
            icon="local-atm"
            text="R$53,90 - Contratar"
            onPress={() => initializePaymentSheet("PRATA")}
          />
        </PaymentBox>

        <PaymentBox
          icon="emoji-events"
          text="Bronze"
          color={theme.colors.secondary}
        >
          <TextPayment>
            - Acesso aos simulados da ANAC e simulados de estudos divididos por
            blocos e matérias durante 30 dias corridos.
          </TextPayment>
          <ButtonPayment
            icon="local-atm"
            text="R$33,50 Contratar"
            onPress={() => initializePaymentSheet("BRONZE")}
          />
        </PaymentBox>
      </HighlightPayments>
    </Payments>
  );
}
