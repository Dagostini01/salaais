import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Button, ButtonText, Container, Input } from "./styles";

export const CompleteProfile = () => {
  const { signInWithAppleComplete } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    if (name !== "" && email !== "") {
      signInWithAppleComplete(name, email);
    }
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button onPress={onSubmit}>
        <ButtonText>Confirmar</ButtonText>
      </Button>
    </Container>
  );
};
