import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {HStack, Box, NativeBaseProvider, VStack, Divider, Progress} from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';


const ListProyek = () => {
    const [data, setData] = useState([]);

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
                <Box px="4" pb="4">
                    <HStack space={2}>
                        <TouchableWithoutFeedback onPress={() => dimensiProyek(item.id, item.nama_paket, item.nomor_kontrak)}> 
                            <View style={styles.detailButton}>
                                <FontAwesome5 name="ruler" size={16} color="white" style={styles.buttonText}>
                                    <Text style={{fontFamily:"arial"}}>Dimensi Proyek</Text>
                                </FontAwesome5>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => kesiapanLahan(item.id)}>
                            <View style={styles.detailButton}>
                                <FontAwesome5 name="check" size={16} color="white" style={styles.buttonText}>
                                    <Text style={{fontFamily:"arial"}}>Kesiapan Lahan</Text>
                                </FontAwesome5>
                            </View>
                        </TouchableWithoutFeedback>
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

const styles = {
    detailButton:{
        backgroundColor:'#728FCE',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        height: 50,
        width:175,
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
    }
}