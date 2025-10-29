import Feather from "@expo/vector-icons/Feather";
import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.text};
  padding: 16px;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  padding-bottom: 16px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
`;

export const UserInfoContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const SubscriptionInfo = styled.View`
  padding-horizontal: 16px;
  margin-top: 16px;
`;

export const SubscriptionInfoText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  font-weight: bold;
`;

export const SubscriptionInfoTextTime = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "14px" : "12px"};
  font-weight: 300;
`;

export const Photo = styled.Image`
  align-self: center;
  width: 52px;
  height: 52px;
  border-radius: 8px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-weight: 500;
  font-size: ${Platform.OS === "ios" ? "22px" : "20px"};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "18px" : "16px"};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${Platform.OS === "ios" ? "28px" : "24px"};
  padding-right: 16px;
`;

export const CardsTest = styled.View`
  gap: 16px;
  margin-bottom: 16px;
`;

export const NameCardTest = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${Platform.OS === "ios" ? "24px" : "22px"};
  font-weight: bold;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { gap: 16 },
})``;

export const LastTest = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const NameTest = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
`;

export const LastNameTest = styled.Text`
  color: ${({ theme }) => theme.colors.text_light};
  font-size: ${Platform.OS === "ios" ? "18px" : "16spx"};
`;

export const ViewPlano = styled.View`
  width: 100%;
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 8px;
  margin-top: auto;
  gap: 8px;
`;

export const TitleViewPlano = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "16px" : "14px"};
  text-align: center;
  font-weight: bold;
`;

export const TextViewPlano = styled.Text`
  text-align: center;
  font-size: ${Platform.OS === "ios" ? "14px" : "12px"};
  color: ${({ theme }) => theme.colors.text_dark};
`;
