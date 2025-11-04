import Feather from "@expo/vector-icons/Feather";
import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
  padding: 20px 16px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const HeaderBackButton = styled(Feather)`
  font-size: ${Platform.OS === "ios" ? "28px" : "24px"};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const HeaderTitle = styled.Text`
  font-size: ${Platform.OS === "ios" ? "32px" : "28px"};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text_dark};
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.text_light};
`;

export const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const ProfileInfo = styled.View`
  flex: 1;
  gap: 4px;
`;

// teste
export const ProfileName = styled.Text`
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const ProfileSubtitle = styled.Text`
  font-size: ${Platform.OS === "ios" ? "16px" : "14px"};
  color: ${({ theme }) => theme.colors.text};
`;

export const MenuList = styled.View``;

export const MenuListDanger = styled(MenuList)`
  margin-top: auto;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.text_light};
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.text_light};
`;

export const MenuIcon = styled(Feather)`
  font-size: ${Platform.OS === "ios" ? "24px" : "22px"};
  color: ${({ theme }) => theme.colors.text_dark};
  width: 28px;
`;

export const MenuContent = styled.View`
  flex: 1;
  gap: 4px;
`;

export const MenuTitle = styled.Text`
  font-size: ${Platform.OS === "ios" ? "17px" : "16px"};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const MenuDescription = styled.Text`
  font-size: ${Platform.OS === "ios" ? "14px" : "13px"};
  color: ${({ theme }) => theme.colors.text};
`;

export const MenuArrow = styled(Feather)`
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  color: ${({ theme }) => theme.colors.text};
`;

export const MenuItemDanger = styled(MenuItem)``;

export const MenuIconDanger = styled(MenuIcon)`
  color: ${({ theme }) => theme.colors.attention};
`;

export const MenuTitleDanger = styled(MenuTitle)`
  color: ${({ theme }) => theme.colors.attention};
`;
