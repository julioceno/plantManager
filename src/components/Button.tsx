import React from "react";
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps} from "react-native";
import colors from "../styles/colors";

// Eu peguei a interface TouchableOpacityProps que permite que tenhamos
// propriedades de botões e estendi a minha interface ButtonProps até 
// Dessa forma eu vou poder usar propriedades de botões nesse meu componente
interface ButtonProps extends TouchableOpacityProps { 
    title: string;
}

// Através do ...rest eu espalhei a interface TouchableOpacityProps no meu 
// componente e assim eu poderei usar eles no componente
export function Button({ title, ...rest } : ButtonProps ) {
    return(

        <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.7}
        {...rest} // Espalhei todos as props do TouchableOpacityProps nessa minha tag do componente
        >
            <Text style={styles.buttonText}>
                { title }
            </Text>
        </TouchableOpacity>
   
    )
}


const styles = StyleSheet.create({
  
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 15,
        height:56,
        width:56,
    },

    buttonText: {
        color: colors.white,
        fontSize:24
    }
})