import React from "react";
import { Platform } from "react-native";
import {
    createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import { PlantSelect } from "../pages/PlantSelect";
import { MaterialIcons } from "@expo/vector-icons"

const AppTab = createBottomTabNavigator();

import colors from "../styles/colors";
import { MyPlants } from "../pages/MyPlants";


/**   
 * Esse arquivo ele vai fazer a tab routes que fica ao rodapé das páginas indicadas
*/
const AuthRoutes = () => {
    return (
        <AppTab.Navigator 
            tabBarOptions={{ // Configurações da tab navigatir
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: "beside-icon",
                style: {
                    paddingVertical: Platform.OS === "ios"? 20 : 0,
                    height: 88
                },
            }}>

            <AppTab.Screen 
                name="Nova Planta"
                component={PlantSelect} // em qual componente essa tab vai ficar
                options={{
                    tabBarIcon: (({ size, color }) => ( // Configurações da opção 
                        <MaterialIcons 
                            name="add-circle-outline" 
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTab.Screen 
                name="Minhas Plantas"
                component={MyPlants}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />


        </AppTab.Navigator>
    )
}

export default AuthRoutes;