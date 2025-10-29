import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 20px;
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 135px;
  height: 135px;
  resize-mode: contain;
`;
