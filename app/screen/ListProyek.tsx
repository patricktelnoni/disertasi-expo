import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {HStack, Avatar, Box, NativeBaseProvider, VStack} from 'native-base';
import { router } from 'expo-router';

const ListProyek = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    const getDetail = (id) => {
        router.push({pathname:'/screen/DetailProyek', params: {id: id}});
    }

    const renderItem = ({ item }) => (
        
        <Box>
            <VStack space={2} justifyContent="flex-start">
                <HStack space={[1, 3]} >
                    
                    <TouchableWithoutFeedback onPress={() => getDetail(item.id)}>
                        <VStack>
                            <Ionicons name="construct" size={24} color="black" />
                            <Text>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </VStack>
                    </TouchableWithoutFeedback>
                    
                </HStack>
                <TouchableWithoutFeedback onPress={() => getDetail(item.id)}>
                        <VStack space="2.5" mt="4" px="4">
                            <FontAwesome5 name="ruler-combined" size={24} color="black" />
                            <Text> Dimensi Proyek</Text>
                        </VStack>
                    </TouchableWithoutFeedback>
            </VStack>
           
        </Box>
        
    );

    return (
        <NativeBaseProvider>
        
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        
        </NativeBaseProvider>
    );
};

export default ListProyek;