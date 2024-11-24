import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import {HStack, Box, NativeBaseProvider, VStack, Divider, Heading, Flex, Spacer, Center} from 'native-base';
import { useLocalSearchParams, Stack } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const DetailProgressProyek = () => {
    const [data, setData]           = useState([]);
    const [total, setTotal]         = useState([]);
    const [progress, setProgress]   = useState(0);
    const params = useLocalSearchParams();

    let proyek_id       = params.id;
    let nama_paket      = params.nama_paket;
    let nomor_kontrak   = params.nomor_kontrak;

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
        <Box 
            borderRadius="10" 
            borderWidth="3" 
            borderColor="muted.200" 
            fontSize={25}
            margin={2}>
            <VStack space="4" >
                <Box px="4" pt="4">
                    <Text style={{fontWeight: "bold", fontSize:24, color:"#0e7490"}}>{item.nama_item_pekerjaan}</Text>
                </Box>
                <Flex flexDirection="row">
                       <Center marginRight={6}>
                            <AnimatedCircularProgress
                                size={75}
                                width={5}
                                fill={item.progress}
                                tintColor="#fbbf24"
                                backgroundColor="#3d5875" > 
                                {
                                    (fill) => (
                                    <Text>
                                        { item.progress == null ? 0: item.progress  }%
                                    </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </Center>
                    <Flex flexDirection="column" marginRight={11}>
                        <Flex flexDirection="row">
                            <Text style={styles.baseText}>Volume Pekerjaan     </Text>
                            <Spacer />
                            <Text style={styles.baseText}> {item.volume_total}</Text>
                        </Flex>
                        <Flex flexDirection="row">
                            <Text style={styles.baseText}>Biaya Pekerjaan     </Text>
                            <Spacer />
                            <Text style={styles.baseText}> {item.biaya_total}</Text>
                        </Flex>
                    </Flex>
                </Flex>                
                <Box px="4">
                    <Divider />
                </Box>
            </VStack>
        </Box>
    
    );

    return (
        <NativeBaseProvider>
            <Stack.Screen options={{title: 'Detail Progress Pengerjaan'}}/>
            <Box maxW="80%" alignItems="left" margin="5%">
                <Heading size="xl" ml="-1" color="cyan.700">Nama Paket : {nama_paket}</Heading>
                <Flex flexDirection="row">
             
                        <FontAwesome5 name="file-contract" size={28} color="#0891b2" style={{marginRight:10}} />
                        <Text style={styles.baseText}>Nomor Kontrak</Text>
                
                    <Spacer />
                    <Text style={styles.baseText}> {nomor_kontrak}</Text>
                </Flex>
                <Flex flexDirection="row">
                    <HStack>
                        <FontAwesome6 name="bars-progress" size={27} color="#0891b2" style={{marginRight:10}}/>
                        <Text style={styles.baseText}>Total Progress: </Text>
                    </HStack>
                    
                    <Spacer />
                    <Text style={styles.baseText}>{progress}</Text>
                </Flex>
           
                <Flex flexDirection="row">
                    <HStack>
                        <FontAwesome6 name="money-bill" size={27} color="#0891b2" style={{marginRight:10}}/>
                        <Text style={styles.baseText}>Total Biaya: </Text>
                    </HStack>
                    <Spacer />
                    <Text style={styles.baseText}>{total}</Text>
                </Flex>
                
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
    icons:{
        width: 30,
        height: 30,
        padding:5,
        margin:4,
        marginRight:10,
    },
    baseText:{

        fontSize: 16,
        color: 'black',
        marginRight: 5,
    },

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