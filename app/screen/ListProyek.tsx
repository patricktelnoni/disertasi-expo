import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {HStack, Avatar, Box, NativeBaseProvider, VStack} from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ListProyek = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const response = await fetch('https://palugada.me/api/info_proyek/');
            const jsonData = await response.json();
            //console.log(jsonData.data);
            setData(jsonData.data);
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
                            <Text>{item.nomor_kontrak}</Text>
                            <Text>{item.nama_paket}</Text>
                            <Text>{item.lokasi_pekerjaan}</Text>
                        </VStack>
                    </TouchableWithoutFeedback>
                    
                </HStack>
                    <TouchableWithoutFeedback onPress={() => getDetail(item.id)}>
                        <VStack space="2.5" mt="4" px="4">
                        
                            <FontAwesome5 name="ruler-combined" size={9} color="black" >
                             <Text>Dimensi Proyek</Text>
                             </FontAwesome5>
                        
                        </VStack>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => getDetail(item.id)}>
                        <VStack space="2.5" mt="4" px="4">
                            <Octicons name="check-circle" size={9} color="black" >
                                <Text>Kesiapan Lahan</Text>
                            </Octicons>
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