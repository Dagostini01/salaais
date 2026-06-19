import { Platform } from "react-native";
import styled from "styled-components/native";

export const Card = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  font-weight: 700;
  letter-spacing: 0.2px;
  margin-bottom: 16px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const ChartWrapper = styled.View`
  width: 132px;
  height: 132px;
  align-items: center;
  justify-content: center;
`;

export const CenterLabel = styled.View`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.shape};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.08;
  shadow-radius: 2px;
  elevation: 2;
`;

export const CenterValue = styled.Text<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  font-weight: 800;
  line-height: ${Platform.OS === "ios" ? "24px" : "22px"};
`;

export const CenterCaption = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "10px" : "9px"};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-top: 1px;
`;

export const Legend = styled.View`
  flex: 1;
  gap: 10px;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const LegendDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

export const LegendText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "14px" : "12px"};
  font-weight: 500;
`;

export const LegendPercent = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "14px" : "12px"};
  font-weight: 600;
`;
