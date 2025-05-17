import React, { useState } from "react";
import { Modal, Text } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

const Wrapper = styled.View`
  width: 100%;
`;

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
  width: 100%;
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
  align-items: center;
`;

const ModalMessage = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 15px;
`;

const CloseButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

export function ReviewButton() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Wrapper>
      <Button onPress={() => setModalVisible(true)}>
        <ButtonText>Revisar</ButtonText>
      </Button>

      <Modal visible={modalVisible} transparent animationType="fade">
        <ModalContainer>
          <ModalBox>
            <ModalMessage>Conteúdo do modal de revisão aqui.</ModalMessage>
            <CloseButton onPress={() => setModalVisible(false)}>
              <CloseButtonText>Fechar</CloseButtonText>
            </CloseButton>
          </ModalBox>
        </ModalContainer>
      </Modal>
    </Wrapper>
  );
}
