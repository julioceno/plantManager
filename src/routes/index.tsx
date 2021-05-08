import React from "react";
import { NavigationContainer } from "@react-navigation/native"

import StackRoutes from "./stack.routes"

const Routes = () => (
    // Container de navegação
    <NavigationContainer> 
        <StackRoutes />
    </NavigationContainer>
);

export default Routes;