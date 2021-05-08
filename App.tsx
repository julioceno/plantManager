import React from "react";
import AppLoading from "expo-app-loading"

import  Routes  from "./src/routes/index";
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

// A função principal do aplicativo deverá receber um export default para 
//o react native entender que ele é a função principal
export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if (!fontsLoaded) // O expo-app-loading faz com que o app fique carregando na tela de splash até toda fonte ser carregada
    return <AppLoading />;

  return (
    <Routes />
  );
};