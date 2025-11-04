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
  padding-bottom: 20px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  margin-bottom: 16px;
`;

export const UserInfoContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

export const SubscriptionInfo = styled.View`
  margin-horizontal: 20px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const SubscriptionInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SubscriptionInfoLeft = styled.View`
  flex: 1;
`;

export const SubscriptionInfoText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "16px" : "14px"};
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export const SubscriptionInfoTextTime = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "13px" : "11px"};
  font-weight: 400;
  margin-top: 4px;
`;

export const SubscriptionBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_light};
  padding-horizontal: 10px;
  padding-vertical: 6px;
  border-radius: 8px;
`;

export const SubscriptionBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${Platform.OS === "ios" ? "12px" : "10px"};
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const Photo = styled.Image`
  align-self: center;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.shape};
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-weight: 700;
  font-size: ${Platform.OS === "ios" ? "22px" : "20px"};
  letter-spacing: 0.2px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "15px" : "13px"};
  font-weight: 400;
  opacity: 0.8;
  margin-top: 2px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? "26px" : "24px"};
  opacity: 0.7;
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
