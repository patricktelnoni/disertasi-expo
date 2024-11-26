import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { formatCurrency } from "react-native-format-currency";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
            
        <View className='flex-col bg-slate-200 rounded-2xl' style={{marginTop:20}}> 
            <Text className='font-bold text-2xl shadow-sm' style={{color:"#0e7490"}}>{item.nama_item_pekerjaan}</Text>
            <View className='flex-row'>
                <View className='flex-col px-6'>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
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
                </View>
                <View className='flex-col justify-center item-center px-6'>
                    <View className='flex-row justify-between item-center'>
                        <FontAwesome6 name="glass-water" size={30} color="black" />
                        <Text style={styles.baseText}> {item.volume_total}</Text>         
                    </View>
                    <View className='flex-row justify-between item-center'>
                        <FontAwesome6 name="money-bill-wave" size={30} color="black" />
                        <Text style={styles.baseText}> {formatCurrency({ amount: item.biaya_total, code: "IDR" })[0]}</Text>        
                    </View>
                    <View className='flex-row justify-between item-center'>
                        <FontAwesome5 name="calendar-alt" size={30} color="black" />
                        <Text style={styles.baseText}> {item.tanggal_dokumentasi}</Text>        
                    </View>
                </View>     
            </View> 
        </View>
    );

    return (
        <View>
            <Stack.Screen options={{title: 'Detail Progress Pengerjaan'}}/>
            <View className='flex-col px-2 p-2'>
                <Text className='font-bold text-3xl shadow-sm'>Nama Paket : {nama_paket}</Text>
                <View className='flex-row content-around'>
                    <FontAwesome6 className='basis-12' name="file-contract" size={30} color="black" />
                    <Text className='basis-60' style={styles.baseText}>Nomor Kontrak</Text>
                    <Text style={styles.baseText}> {nomor_kontrak}</Text>
                </View>
                <View className='flex-row content-around'>
                    <FontAwesome6 className='basis-12' name="bars-progress" size={24} color="black" />
                    <Text className='basis-60' style={styles.baseText}>Total Progress: </Text>
                    <Text style={styles.baseText}>{progress}</Text>
                </View>
                <View className='flex-row content-around'>
                    
                    <FontAwesome6 className='basis-12' name="money-bill-wave" size={30} color="black" />
                    <Text className='basis-60' style={styles.baseText}>Total Biaya: </Text>
                    <Text style={styles.baseText}>{formatCurrency({ amount: total, code: "IDR" })[0]}</Text>
                </View>
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={renderItem}
                    
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
  
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

        fontSize: 18,
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