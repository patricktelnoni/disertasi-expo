import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import {HStack, Box, NativeBaseProvider,  VStack, Divider, Progress, Button, Center} from 'native-base';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import {Appbar} from 'react-native-paper';

const ListProyek = () => {
    const [data, setData] = useState([]);
    const params = useLocalSearchParams();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const response = await fetch('http://192.168.0.9:8000/api/info_proyek/');
            const response = await fetch('https://palugada.me/api/info_proyek/');
            const jsonData = await response.json();
            //console.log(jsonData.data);
            setData(jsonData.data);
        } catch (error) {
            console.error(error);
        }
    };

    const dimensiProyek = (id) => {
        router.push({pathname:'/screen/FormDimensiProyek', params: {id: id}});
    }

    const kesiapanLahan = (id) => {
        router.push({pathname:'/screen/FormKesiapanLahan', params: {id: id}});
    }

    const detailProgress = (id, nama_paket, nomor_kontrak) => {
        router.push({pathname:'/screen/DetailProgressProyek', 
            params: {
                id: id, 
                nama_paket: nama_paket, 
                nomor_kontrak: nomor_kontrak
            }
        });
    }

    const renderItem = ({ item }) => (
        <Box border="1" borderRadius="md">
            <VStack space="4" >
                <Box px="4" pt="4">
                    <Text style={{fontWeight: "bold", fontSize:24}}>{item.nama_paket}</Text>
                </Box>
                <Box px="4">
                    <Text>{item.nama_paket}</Text>
                    <Text>{item.nomor_kontrak}</Text>
                    <Text>{item.lokasi_pekerjaan}</Text>
                    <Text>{item.nama_ppk}</Text>
                </Box>
                <Box w="90%" maxW="400" px="4">
                    
                    <TouchableWithoutFeedback onPress={() => detailProgress(item.id, item.nama_paket, item.nomor_kontrak)}>
                        <View>
                            <Text>Progress: {item.persentase_progress}</Text>
                            <Progress size="lg" value={item.persentase_progress} mx="4" />
                        </View>
                    </TouchableWithoutFeedback>
                  
                </Box>
                <Box px="4" pb="4" alignItems="center">
                    <HStack space={2}>
                       
                            <Button colorScheme="cyan" 
                                onPress={() => dimensiProyek(item.id, item.nama_paket, item.nomor_kontrak)}
                                width="30%"
                                disabled={item.persentase_progress == 100 ? true:false}>Dimensi Proyek</Button>
                      
                        
                            <View>
                                <Button colorScheme="cyan" 
                                onPress={() => kesiapanLahan(item.id)}
                                width="70%"
                                disabled={item.persentase_progress == 100 ? true:false}>Kesiapan Lahan</Button>
                            </View>
                        
                    </HStack>
                </Box>
                <Box px="4">
                    <Divider />
                </Box>
            </VStack>
        </Box>
    
    );

    return (
        
        <NativeBaseProvider>
            <Stack.Screen options={{title: params.title}}/>
      
            <Box>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Box>
        </NativeBaseProvider>
    );
};

export default ListProyek;
