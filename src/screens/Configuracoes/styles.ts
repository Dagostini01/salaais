import { Platform, StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    gap: 10,
  },
  roundedButton: {
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#c23e3e",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
