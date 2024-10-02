import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(25)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(35)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(24)}px;
`;

export const LastTest = styled.View`
  width: 90%;
  height: ${RFValue(60)}px;
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 5px;
  margin-top: 10px;
  align-self: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TestAnac = styled.View``;

export const NameTest = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  margin-left: 10px;
`;

export const LastNameTest = styled.Text`
  color: ${({ theme }) => theme.colors.text_light};
  font-size: ${RFValue(15)}px;
  margin-left: 10px;
`;

export const CardsTest = styled.View`
  width: 100%;
  height: ${RFPercentage(40)}px;
  background-color: ${({ theme }) => theme.colors.text};
  align-items: flex-start;
`;

export const NameCardTest = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFValue(25)}px;
  margin-left: 17px;
  margin-top: 40px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(13)}px;
`;