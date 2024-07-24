import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { VStack, HStack, Box, Divider, FormControl, NativeBaseProvider } from 'native-base';
import { FontAwesome6 } from '@expo/vector-icons';

const DetailProyek: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const CustomDisplay = ({label, data}) => {
        return (
            <VStack space={2}style={{marginLeft:'3%'}}>
                <Box>
                    <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
                    <Text>{data}</Text>
                </Box>
                <Divider/>
            </VStack>
        );
    }

    const params = useGlobalSearchParams<{id: string}>();
    //const url    = 'https://jsonplaceholder.typicode.com/posts/'+params.id+'';
    const url    = 'https://palugada.me/api/info_proyek/'+params.id+'';
    console.log("Params", url);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <NativeBaseProvider>
            <View>
                
                <Text>Detail Proyek</Text>
                
                <CustomDisplay label="Nama Paket" data={data.nama_paket} />
                <CustomDisplay label="Nama Satker" data={data.nama_satker} />
                <CustomDisplay label="Nama PPK" data={data.nama_ppk} />
                <CustomDisplay label="Nilai Kontrak" data={data.nilai_kontrak} />
                <View>
                    <FontAwesome6 name="map-location" size={24} color="black" />
                    <CustomDisplay label="Lokasi Pekerjaan" data={data.lokasi_pekerjaan} />
                </View>
                <CustomDisplay label="Tanggal PHO" data={data.tanggal_pho} />
                <CustomDisplay label="Tanggal Kontrak" data={data.tanggal_kontrak} />
   
                {/* Render other details here */}
            </View>
        </NativeBaseProvider>
    );
};

export default DetailProyek;