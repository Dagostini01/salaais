import React, { useContext } from "react";
import { CommomRoutes } from "./common.routes";
import { SignInRoutes } from "./signin.routes";
import { AuthContext } from "../contexts/auth";

export const AppRoutes = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <CommomRoutes /> : <SignInRoutes />;
};