import Feather from "@expo/vector-icons/Feather";
import { Platform } from "react-native";
import styled from "styled-components/native";

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.text};
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  margin-top: -10px;
  padding-top: 12px;
  overflow: hidden;
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  nestedScrollEnabled: true,
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 24,
    flexGrow: 1,
  },
})``;

export const ContentSection = styled.View`
  gap: 16px;
`;

export const SectionHeader = styled.View`
  gap: 4px;
`;

export const NameCardTest = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${Platform.OS === "ios" ? "24px" : "22px"};
  font-weight: 700;
  letter-spacing: 0.2px;
`;

export const SectionSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${Platform.OS === "ios" ? "14px" : "13px"};
  opacity: 0.75;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { gap: 14, paddingRight: 4, paddingBottom: 4 },
})``;

export const DashboardSection = styled.View`
  gap: 20px;
`;

export const DashboardLoading = styled.View`
  width: 100%;
  padding: 36px 20px;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

export const LoadingText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "14px" : "13px"};
  font-weight: 500;
`;

export const EmptyDashboardCard = styled.View`
  width: 100%;
  padding: 28px 24px;
  align-items: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const EmptyDashboardIconWrapper = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: rgba(251, 212, 52, 0.25);
  align-items: center;
  justify-content: center;
`;

export const EmptyDashboardIcon = styled(Feather)`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.title};
`;

export const EmptyDashboardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${Platform.OS === "ios" ? "18px" : "17px"};
  font-weight: 700;
  text-align: center;
`;

export const EmptyDashboardText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "14px" : "13px"};
  text-align: center;
  line-height: 20px;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  padding-bottom: 28px;
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

export const CardsTest = styled(ContentSection)``;

export const ViewPlano = styled.View`
  width: 100%;
  padding: 18px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 14px;
  margin-top: auto;
  gap: 8px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  elevation: 2;
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
