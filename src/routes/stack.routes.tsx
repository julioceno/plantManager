import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";

import colors from "../styles/colors";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => ( // React.FC === React Function Components
    <stackRoutes.Navigator 
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}
    >



    <stackRoutes.Screen // A Rota que vem primeiro será a rota inicial
        name="Welcome" // Quando alguém chamar por esse nome de tela apresente o componente respectivo
        component={Welcome}
    />

    <stackRoutes.Screen 
        name="UserIdentification"
        component={UserIdentification}
    />

    <stackRoutes.Screen 
        name="Confirmation"
        component={Confirmation}
    />
                
    </stackRoutes.Navigator>

)

export default AppRoutes;