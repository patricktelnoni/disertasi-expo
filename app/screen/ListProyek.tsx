import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



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



    const detailProgress = (id, nama_paket, nomor_kontrak, progress) => {
        router.push({pathname:'/screen/DetailProgressProyek', 
            params: {
                id: id, 
                nama_paket: nama_paket, 
                nomor_kontrak: nomor_kontrak,
                progress: progress
            }
        });
    }

    const renderItem = ({ item }) => (
        <Pressable className='flex-col bg-slate-200 rounded-2xl w-56 m-2'
                   onPress={() => detailProgress(item.id, item.nama_paket, item.nomor_kontrak, item.persentase_progress)}>
            <View  style={{marginTop:20}}>
                <View className="flex-col justify-center items-center mt-2">
                    <AnimatedCircularProgress
                            size={110}
                            width={15}
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
                    <Text className='w-30' style={{fontWeight: "bold", fontSize:18, color:"#0e7490"}}>{item.nama_paket}</Text>
                </View>

                <View className='flex-row'>
                    <View className='px-4 flex-col'>
                        <View className='flex-row'>
                            <Image 
                                source={require('@/assets/icons/sticky-notes.png')} 
                                style={styles.icons}/>
                            <Text style={styles.baseText}>{item.nomor_kontrak}</Text>
                        </View>
                        <View className='flex-row'>
                            <Image 
                                source={require('@/assets/icons/location.jpg')} 
                                style={styles.icons}/>
                            <Text style={styles.baseText}>{item.lokasi_pekerjaan}</Text>
                        </View>
                        <View className='flex-row'>
                            <Image 
                                source={require('@/assets/icons/pejabat.png')} 
                                style={styles.icons}/>
                            <Text style={styles.baseText}>{item.nama_ppk}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </Pressable>
    );

    return (
        <View>
            <Stack.Screen options={{title: params.title}} />
            <View className='justify-center'>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={renderItem}
                    columnWrapperStyle={{justifyContent:'space-around'}}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

export default ListProyek;

const styles = {
    icons:{
        width: 25,
        height: 25,
        padding:5,
        margin:4,
        marginRight:10,
    },
    baseText:{
        fontSize: 13,
        fontWeight: 'normal',
        color: '#3d5a80',
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
        fontSize: 13,
    }
}
