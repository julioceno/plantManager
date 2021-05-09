import React, { useEffect, useState } from 'react';

import { 
    StyleSheet,
    Text, 
    View, 
    FlatList,
    ActivityIndicator
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { Header } from "../components/Header";
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from "../components/Load"

import colors from "../styles/colors";
import fonts from '../styles/fonts';

import api from '../services/api';

interface EnviromentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: string,
    name: string,
    about: string,
    water_tips: string,
    photo: string,
    environments: [string],
    frequency: {
      times: number,
      repeat_every: string
    }
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState("all");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();
    
    function handleEnrivomentSelected(environment: string) {
        setEnviromentSelected(environment)

        if (environment === "all") // Se a key do botão environment(ambiente) for all eu vou setar todas as plantas no filteredPlants
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant => // Vou pegar a key do botão e checar pra qual environment ele pertence e depois aplicar as plantas do environment no filteredPlants
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    };

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`) // Estou pegando só 8 registros
        
        if(!data) 
            return setLoading(true);

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }
  
        setLoading(false);
        setLoadingMore(false);
    };

    function handleFetchMore(distance: number) {
        if (distance < 1) // Se o usuário estiver rolando pra cima
            return;
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    };

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate("PlantSave", { plant })
    }

    useEffect(() => { // Só vai apresentar a página para o usuário após que o que estiver neste hook for carregado
        async function fetchEnviroment() {
            const { data } = await api
                .get("plants_environments?_sort=title&_order=asc") // O que tem após o "?" é a organização que o json-server fará a organização e ordem alfabética
            
            setEnviroments([
                {
                    key: "all",
                    title: "Todos"
                },

                ...data
            ])
        }

        fetchEnviroment()
    },[])

    useEffect(() => {
     

        fetchPlants()
    },[])

    if (loading) 
        return <Load />

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>   

            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={ ({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === enviromentSelected} // Só será ativo se a key for igual a key que está no enviromentSelected
                            onPress={()=> handleEnrivomentSelected(item.key)} // Esse onPress é feito e é passado a key do elemento que estou clicando pra ele ficar ativo
                        />
                        
                    )}

                    horizontal // Deixando a lista na horizontal
                    showsHorizontalScrollIndicator={false} // A barra de scroll vertical vai sumir
                    contentContainerStyle={styles.enviromentList} // O contentContainerStyle é como se fosse o style
                >
                    
                </FlatList>
            </View>

            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants} // Vou renderizar os dados do array plants
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1} // Quando tiver a .10% do fim do flatlist  será dada como o final
                    onEndReached={({ distanceFromEnd }) => // Ai será ativado essa função pra chamar a paginação
                        handleFetchMore(distanceFromEnd)
                    }

                    ListFooterComponent={
                        loadingMore?
                        <ActivityIndicator color={colors.green}/>
                        : <></>
                    }
                    
              />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: 30,
        paddingTop: 10 
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 20
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    enviromentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
    },

  


})