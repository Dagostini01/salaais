import styled from "styled-components/native";

export const Container = styled.View`
  width: 85%;
  margin-top: 10px;
`;

export const ProgressBar = styled.View<{ status: "success" | "primary" | "attention" }>`
  height: 25px;
  background-color: ${({ theme, status }) => theme.colors[status]};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ProgressText = styled.Text`
  color: white;
  font-weight: bold;
  `;
  //width: 100%;
  //text-align: center;
  //border: 1px;