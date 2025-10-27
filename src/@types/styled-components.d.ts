import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      secondary_light: string;
      succes: string;
      succes_light: string;
      attention: string;
      attention_light: string;
      shape: string;
      title: string;
      text: string;
      text_light: string;
      text_dark: string;
      background: string;
      dark: string;
    };
  }
}
