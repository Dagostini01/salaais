import styled from "styled-components/native";

export const Container = styled.View`
  width: 85%;
  margin-top: 10px;
  align-self: center;
`;

export const ProgressBar = styled.View<{
  status: "success" | "primary" | "attention";
}>`
  height: 25px;
  background-color: ${({ theme, status }) =>
    theme.colors[status as keyof typeof theme.colors]};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ProgressText = styled.Text`
  color: white;
  font-weight: bold;
`;
