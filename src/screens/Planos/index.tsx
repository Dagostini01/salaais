import React from "react";
import { Payments, TextPayment, HighlightPayments } from "./styles";
import { PaymentBox } from "../../components/PaymentBox";
import theme from "../../global/global/theme";
import { ButtonPayment } from "../../components/ButtonPayment";

export function Planos() {
    return (

        <Payments>

            <HighlightPayments>


                <PaymentBox icon="emoji-events" text="Premium" color={theme.colors.attention}>
                    <TextPayment>
                        - Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 120 dias corridos.
                    </TextPayment>
                    <ButtonPayment icon="local-atm" text="R$93,90 - Contratar plano" />
                </PaymentBox>

                <PaymentBox icon="emoji-events" text="Ouro" color={theme.colors.primary}>
                    <TextPayment>
                        - Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 90 dias corridos.
                    </TextPayment>
                    <ButtonPayment icon="local-atm" text="R$73,90 - Contratar plano" />
                </PaymentBox>

                <PaymentBox icon="emoji-events" text="Prata" color={theme.colors.text}>
                    <TextPayment>
                        - Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 60 dias corridos.
                    </TextPayment>
                    <ButtonPayment icon="local-atm" text="R$53,90 - Contratar plano" />
                </PaymentBox>

                <PaymentBox icon="emoji-events" text="Bronze" color={theme.colors.secondary}>
                    <TextPayment>
                        - Acesso aos simulados da ANAC e simulados de estudos divididos por blocos e matérias durante 30 dias corridos.
                    </TextPayment>
                    <ButtonPayment icon="local-atm" text="R$33,50 Contratar plano" />
                </PaymentBox>

            </HighlightPayments>

        </Payments>
    );
}
