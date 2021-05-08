import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import loadAnimation from "../assets/load.json"

export function Load() {
    return (
        <View style={styles.container}
        // Esse container vai obter a maior parte do espaço disponível para no centro  
        // ter a animação
        >
            <LottieView 
                source={loadAnimation}
                autoPlay
                loop
                style={styles.animation}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    animation: {
        backgroundColor: "transparent",
        width: 200,
        height:200
    }
})