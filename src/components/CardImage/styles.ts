import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 18px;
  width: 148px;
  height: 148px;
  align-items: center;
  justify-content: center;
  padding: 12px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
