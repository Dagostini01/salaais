import Feather from "@expo/vector-icons/Feather";
import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 12px 16px 16px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderBackButton = styled(Feather)`
  font-size: ${Platform.OS === "ios" ? "28px" : "24px"};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const HeaderTitle = styled.Text`
  font-size: ${Platform.OS === "ios" ? "28px" : "24px"};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text_dark};
  flex: 1;
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 16,
    gap: 20,
  },
})`
  flex: 1;
`;

export const ProfileCard = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

export const AvatarRing = styled.View`
  padding: 3px;
  border-radius: 42px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Avatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.shape};
`;

export const ProfileInfo = styled.View`
  flex: 1;
  gap: 6px;
`;

export const ProfileName = styled.Text`
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const ProfileEmail = styled.Text`
  font-size: ${Platform.OS === "ios" ? "14px" : "13px"};
  color: ${({ theme }) => theme.colors.text};
`;

export const PlanRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

export const PlanBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_light};
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 8px;
`;

export const PlanBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${Platform.OS === "ios" ? "11px" : "10px"};
  font-weight: 700;
  letter-spacing: 0.4px;
`;

export const PlanExpiry = styled.Text`
  font-size: ${Platform.OS === "ios" ? "12px" : "11px"};
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.6px;
  margin-left: 4px;
  margin-bottom: -12px;
`;

export const MenuGroup = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  elevation: 2;
`;

export const MenuItem = styled.TouchableOpacity<{ $bordered?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  gap: 14px;
  border-bottom-width: ${({ $bordered }) => ($bordered ? "1px" : "0px")};
  border-bottom-color: ${({ theme }) => theme.colors.background};
`;

export const IconWrapper = styled.View<{ $background: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $background }) => $background};
`;

export const MenuIcon = styled(Feather)<{ $color?: string }>`
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  color: ${({ $color, theme }) => $color ?? theme.colors.text_dark};
`;

export const MenuContent = styled.View`
  flex: 1;
  gap: 2px;
`;

export const MenuTitle = styled.Text<{ $danger?: boolean }>`
  font-size: ${Platform.OS === "ios" ? "16px" : "15px"};
  font-weight: 600;
  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.attention : theme.colors.text_dark};
`;

export const MenuDescription = styled.Text`
  font-size: ${Platform.OS === "ios" ? "13px" : "12px"};
  color: ${({ theme }) => theme.colors.text};
  line-height: 18px;
`;

export const MenuArrow = styled(Feather)`
  font-size: ${Platform.OS === "ios" ? "18px" : "16px"};
  color: ${({ theme }) => theme.colors.text_light};
`;

export const Footer = styled.View`
  align-items: center;
  padding-top: 4px;
`;

export const FooterText = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
