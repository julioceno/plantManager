import React, { useState } from "react";
import { 
    SafeAreaView,
    View, 
    Text, 
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button"

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
    const [isFocused, SetIsFocused] = useState(false); 
    const [isFilled, SetIsFilled] = useState(false);
    const [name, setName] = useState<string>(); /* Eu Estou tipando esse name pra receber apenas  strings
    Ja os outros acima não estão tipados pois eu defini um valor padrão para eles, dessa forma o typescript 
    ja seta o tipo deles como boolean
    */

    const navigation = useNavigation();

    function handleInputBlur() {
        SetIsFocused(false);
        SetIsFilled(!!name) // Se caso o usuário sair do input e o isFilled ainda continuar true o input continua em focus
    }

    function handleInputFocus() {
        SetIsFocused(true);
    }

    function handleInputChange(value: string) {
        SetIsFilled(!!value);
        setName(value); 
    }


    async function handleSubmit() {
        if(!name) 
            return Alert.alert("Me diz como chamar você ");

        try {
            await AsyncStorage.setItem('@plantmanager:user', name) // O retorno não é de imediato, então precisamos deixá-la async
            navigation.navigate("Confirmation", {
                title: "Prontinho",
                subtitle: "Agora vamos começar cuidar das suas plantinhas com muito cuidado",
                buttonTitle: "Começar",
                icon: "smile",
                nextScreen: "PlantSelect",
            });
        } catch(err) {
            return Alert.alert("Não foi possível salvar o seu nome ");
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios"? "padding" : "height"} // O comportamento (behavior) será que se o device for IOS
                                                                   // Quando o teclado subir os elementos do app subirão junto
            >             


            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
                /* Isso serve para quando o usuário clicar em qualquer lugar o teclado fechar*/
            >

                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}
                            /** Nos celulares que tem animação do aplicativo ao subir o teclado a animação
                            * Ocorreria meio esquisita, quando eu envolvo os dois texts nessa view
                            * a animação ocorrerá corretamente
                            */
                            
                            > 
                                <Text style={styles.emoji}>
                                    { isFilled?  "😄" : "😃" }
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'} 
                                    chamar você?
                                </Text>
                            </View>
                    
                            <TextInput 
                                style={[ 
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange} // O onChangeText captura a mudança no input de nome
                            />

                        <View style={styles.footer}>
                            <Button 
                                title="confirmar"
                                onPress={handleSubmit}
                            />
                        </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    content: {
        flex: 1,
        width: "100%"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 54,
        alignItems: "center"
    },
    header: {
        alignItems: "center"
    },

    emoji: {
        fontSize: 44,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center"
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading,

        marginTop: 25
    },

    footer: {
        marginTop: 40,
        width:"100%",
        paddingHorizontal: 20
    }

})