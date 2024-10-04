import type React from "react";
import { Modal } from "react-native";
import {
  ModalButton,
  ModalButtonCancel,
  ModalButtonText,
  ModalButtonTextCancel,
  ModalContainer,
  ModalText,
} from "./styles";

type CustomModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
  confirmText: string;
  cancelText: string;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  text,
  confirmText,
  cancelText,
}) => (
  <Modal visible={visible} animationType="slide" transparent={true}>
    <ModalContainer>
      <ModalText>{text}</ModalText>
      <ModalButton onPress={onConfirm}>
        <ModalButtonText>{confirmText}</ModalButtonText>
      </ModalButton>
      <ModalButtonCancel onPress={onCancel}>
        <ModalButtonTextCancel>{cancelText}</ModalButtonTextCancel>
      </ModalButtonCancel>
    </ModalContainer>
  </Modal>
);
