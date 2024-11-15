import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {HStack, Box, NativeBaseProvider, VStack, Divider, Progress} from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const DetailProgressProyek = () => {
    const [data, setData]           = useState([]);
    const [total, setTotal]         = useState([]);
    const [progress, setProgress]   = useState(0);
    const params = useLocalSearchParams();

    let proyek_id = params.id;
    let nama_paket = params.nama_paket;
    let nomor_kontrak = params.nomor_kontrak;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const response = await fetch('http://192.168.0.9:8000/api/info_proyek/');
            const response = await fetch('https://palugada.me/api/progress_proyek/' + proyek_id + '');
            const jsonData = await response.json();
            //console.log(jsonData.data);
            setData(jsonData.data);
            setTotal(jsonData.total.total_dana);
            setProgress(jsonData.total.progress)
        } catch (error) {
            console.error(error);
        }
    };


    const renderItem = ({ item }) => (
        <Box border="1" borderRadius="md">
            <VStack space="4" >
                <Box px="4" pt="4">
                    <Text style={{fontWeight: "bold", fontSize:24}}>{item.nama_paket}</Text>
                </Box>
                <Box px="4">
                    <Text>Nama Pekerjaan    : {item.nama_item_pekerjaan}</Text>
                    <Text>Volume Pekerjaan    : {item.volume_total}</Text>
                    <Text>Biaya Pekerjaan     : {item.biaya_total}</Text>
                    <Text>Persentase Progress : {item.progress} %</Text>
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
                <Text>Nama Paket : {nama_paket}</Text>
                <Text>Nomor Kontrak: {nomor_kontrak}</Text>
                <Text>Total Progress: {total}</Text>
                <Text>Total Biaya: {progress}</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Box>
        </NativeBaseProvider>
    );
};

export default DetailProgressProyek;

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