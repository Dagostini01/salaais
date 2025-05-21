import React, { useState } from "react";
import { Alert, Modal, TextInput } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { enviarRevisaoQuestao } from "../../services/services";

type Props = {
  questaoKey: string;
  alternativaAssinalada: string;
  acertouQuestao: boolean;
  token: string;
};

export function ReviewButton({
  questaoKey,
  alternativaAssinalada,
  acertouQuestao,
  token,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    if (!alternativaAssinalada) {
      Alert.alert(
        "Atenção",
        "Você precisa ter selecionado uma alternativa para enviar uma revisão."
      );
      return;
    }

    setLoading(true);
    try {
      console.log("Enviando revisão com:", {
        questao_key: questaoKey,
        texto: "",
        alternativa_assinalada: alternativaAssinalada,
        descricao,
        acertou_questao: acertouQuestao,
      });

      await enviarRevisaoQuestao(token, {
        questao_key: questaoKey,
        texto: "",
        alternativa_assinalada: alternativaAssinalada,
        descricao,
        acertou_questao: acertouQuestao,
      });

      Alert.alert("Sucesso", "Sua revisão foi enviada.");
      setModalVisible(false);
      setDescricao("");
    } catch (error) {
      Alert.alert("Erro ao enviar revisão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={() => setModalVisible(true)}>
        <ButtonText>Revisar</ButtonText>
      </Button>

      <Modal visible={modalVisible} transparent animationType="fade">
        <ModalContainer>
          <ModalBox>
            <ModalMessage>
              Escreva sua dúvida ou sugestão sobre a questão:
            </ModalMessage>

            <StyledTextInput
              placeholder="Digite sua observação..."
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <CloseButton onPress={enviar} disabled={loading}>
              <CloseButtonText>
                {loading ? "Enviando..." : "Enviar revisão"}
              </CloseButtonText>
            </CloseButton>

            <CloseButton onPress={() => setModalVisible(false)}>
              <CloseButtonText>Fechar</CloseButtonText>
            </CloseButton>
          </ModalBox>
        </ModalContainer>
      </Modal>
    </>
  );
}

// Styled Components
const Button = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
`;

const ButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  font-weight: bold;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  width: 85%;
  align-items: center;
`;

const ModalMessage = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  min-height: 100px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-top: 15px;
  text-align-vertical: top;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 15px;
`;

const CloseButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;
