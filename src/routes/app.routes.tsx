import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { CommomRoutes } from "./common.routes";
import { SignInRoutes } from "./signin.routes";

export const AppRoutes = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <CommomRoutes /> : <SignInRoutes />;
};
