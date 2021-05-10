import React, { useEffect } from "react";
import AppLoading from "expo-app-loading"
import * as Notifications from "expo-notifications";

import  Routes  from "./src/routes/index";
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { PlantProps } from "./src/libs/storage";

// A função principal do aplicativo deverá receber um export default para 
//o react native entender que ele é a função principal
export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    console.log("Antes da notificação")
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data)
      }
    )

    console.log("notificação")
    return () => subscription.remove()

    // async function notifications() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log(" ############## Notificações Agendadas ##############")
    //   console.log(data)

    // }

    // notifications()
  });

  if (!fontsLoaded) // O expo-app-loading faz com que o app fique carregando na tela de splash até toda fonte ser carregada
    return <AppLoading />;

  return (
    <Routes />
  );
};