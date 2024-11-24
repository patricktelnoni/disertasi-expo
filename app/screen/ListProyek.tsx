import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import {HStack, Box, NativeBaseProvider,  VStack, Divider, Progress, Button, Center, Flex,Spacer} from 'native-base';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
        <Pressable onPress={() => detailProgress(item.id, item.nama_paket, item.nomor_kontrak)}>
            <Box  
            borderRadius="xl"
            borderWidth="2" 
            borderColor="light.300" 
            backgroundColor="light.000"
            onPress={() => detailProgress(item.id, item.nama_paket, item.nomor_kontrak)}
            margin={2}>
                <VStack space="4" >
                    <Box px="4" pt="4">
                        <Text style={{fontWeight: "bold", fontSize:24, color:"#0e7490"}}>{item.nama_paket}</Text>
                    </Box>
                    <Box px="4">
                        <Flex flexDirection="column">
                            <Center marginRight={6}>
                                    <AnimatedCircularProgress
                                        size={220}
                                        width={10}
                                        fill={item.persentase_progress}
                                        tintColor="#f87171"
                                        backgroundColor="#3d5875" > 
                                        {
                                            (fill) => (
                                                <Text>
                                                    { item.persentase_progress == null ? 0: item.persentase_progress }%
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                </Center>
                        </Flex>
                        <Flex flexDirection="row">
                            <HStack>
                                <Image 
                                    source={require('@/assets/icons/sticky-notes.png')} 
                                    style={styles.icons}/>
                                    <Text style={styles.baseText}>{item.nomor_kontrak}</Text>
                            </HStack>
                        </Flex>
                        <Flex flexDirection="row">
                            <HStack>
                                <Image 
                                    source={require('@/assets/icons/location.jpg')} 
                                    style={styles.icons}/>
                                    <Text style={styles.baseText}>{item.lokasi_pekerjaan}</Text>
                            </HStack>
                        </Flex>
                        <Flex flexDirection="row">
                            <HStack>
                                <Image 
                                    source={require('@/assets/icons/pejabat.png')} 
                                    style={styles.icons}/>
                                    <Text style={styles.baseText}>{item.nama_ppk}</Text>
                            </HStack>
                        </Flex>
                    </Box>
                    <Box w="90%" maxW="400" px="4">
        
                    
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
                        <Spacer />
                    </Box>
                </VStack>
            </Box>
        </Pressable>
        
    );

    return (
        
        <NativeBaseProvider>
            <Stack.Screen options={{title: params.title}} />
      
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
    icons:{
        width: 30,
        height: 30,
        padding:5,
        margin:4,
        marginRight:10,
    },
    baseText:{
        fontSize: 18,
        fontWeight: 'normal',
        color: 'cyan.500',
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
