import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/core"
import DateTimePicker, { Event } from "@react-native-community/datetimepicker"
import { format, isBefore } from "date-fns";
import { PlantProps, savePlant } from "../libs/storage";

import { Button } from "../components/Button";

import waterdrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
 import fonts from "../styles/fonts";


interface Params {
  plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");

    const route = useRoute();
    const { plant } = route.params as Params; // Quando você vem da página de escolher um tipo de planta você
    // trás os dados da planta que você escolheu pela rota

    const navigation = useNavigation()
    
    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === "android") {
            setShowDatePicker (oldState => !oldState);
        };

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora no futuro");
        };

        if (dateTime) 
            setSelectedDateTime(dateTime);
    };

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    };

    

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigation.navigate("Confirmation", {
                title: "Tudo certo",
                subtitle: "Fique tranquilo que sempre vamos lembrar você de cuidar de sua plantinha com muito cuidado",
                buttonTitle: "Muito obrigado :D",
                icon: "hug",
                nextScreen: "MyPlants",
            });

        } catch {
            Alert.alert("Não foi possível salvar")
        };


       

     

    };

    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri 
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>    

            <View style={styles.controller}> 
                <View style={styles.tipContainer}>
                    <Image 
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>
                
               {showDatePicker && ( // Quando o usuário clicar em mudar horário o estado showDatePicker será true e o DateTimePicker será apresentado para o usuário
                    <DateTimePicker 
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />
                   )
                }

                {
                    Platform.OS === "android" && (
                        <TouchableOpacity
                            style={styles.dateTimePicketBUtton} 
                            onPress={handleOpenDateTimePickerForAndroid}
                        >
                        <Text style={styles.dateTimePickerText}
                        /** 
                         * Como o estado(variável) por padrão já começa com a data atual
                         * Quando o usuário entrar na tela já será apresentado a hora atual
                         * mas depois o usuário poderá mudar
                         */ 
                        > 
                            {`Mudar ${format(selectedDateTime, "HH:mm")}`}
                        </Text>
                        </TouchableOpacity>
                    )
                }

                <Button
                    title="Cadastrar planta"
                    onPress={handleSave}
                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.shape,
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape,
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    plantAbout: {
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    
    tipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        bottom: 60
    },

    tipImage: {
        width:56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 15,
        textAlign: "justify"
    },
    alertLabel: {
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12, 
        marginBottom:5
    },

    dateTimePicketBUtton: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 40
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }

})

