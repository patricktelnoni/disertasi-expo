import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {HStack, Avatar, Box, Stack, NativeBaseProvider, Center, VStack, Divider} from 'native-base';
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
                <Box px="4" pb="4">
                    <HStack space={2}>
                        <TouchableWithoutFeedback onPress={() => getDetail(item.id)}> 
                            <View style={styles.detailButton}>
                                <FontAwesome5 name="ruler-combined" size={16} color="white" style={styles.buttonText}>
                                    <Text >Dimensi Proyek</Text>
                                </FontAwesome5>  
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => getDetail(item.id)}>
                            <View style={styles.detailButton}>
                                <Octicons name="check-circle" size={16} color="white" style={styles.buttonText}>
                                    <Text >Kesiapan Lahan</Text>
                                </Octicons>
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
        height: 40,
        innerWidth:150,
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
    }
}