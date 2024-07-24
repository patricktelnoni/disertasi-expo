import React, {useEffect, useState, useMemo} from 'react';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import { useLocalSearchParams } from 'expo-router';
import {
    StyleSheet,
    Modal, 
    Pressable, 
} from 'react-native';
import { CustomForm } from './CustomForm';
import {Text, View, TextInput} from 'react-native';
import {Input, FormControl, VStack, NativeBaseProvider} from 'native-base';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      maxHeight:'100%',
    },
    textInput: {
      color: 'black',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 220,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  
const ItemPekerjaan = () => {
    const params = useLocalSearchParams();
    
    const [modalVisible, setModalVisible] = useState(false); 
    const [volumePekerjaan, setVolumePekerjaan] = useState([]);
    const [satuanPekerjaan, setSatuanPekerjaan] = useState([]);
    const [hargaSatuan, setHargaSatuan] = useState([]);
    const [namaItemPekerjaan, setNamaItemPekerjaan] = useState([]);

    let arr = [];

    const handleFinish = () => {
      const url    = 'https://palugada.me/api/info_proyek/'+params.id+'';
      let dataKirim = new FormData();
      let itemPekerjaan = [];
      namaItemPekerjaan.map((item, index) => {
        itemPekerjaan.push({
          nama_item_pekerjaan : item,
          volume_pekerjaan    : volumePekerjaan[index],
          satuan_pekerjaan    : satuanPekerjaan[index],
          harga_satuan        : hargaSatuan[index]
        });
      });
      dataKirim.append('item_pekerjaan', JSON.stringify(itemPekerjaan));
      dataKirim.append('data', params.formData);
      console.log(dataKirim);
    }
    for (let index = 0; index < Number(params.jumlahItem); index++) {
      arr.push(<ProgressStep key={index+1}
        onSubmit={handleFinish}>
        <Text>Item Pekerjaan {index+1}</Text>
        
        <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>Nama Item Pekerjaan {index+1}</FormControl.Label>
                <Input 
                value={namaItemPekerjaan[index]}
                  onChangeText={ (value) => {
                    namaItemPekerjaan[index] = value
                    setNamaItemPekerjaan([...namaItemPekerjaan], namaItemPekerjaan);                                    
                }}/>
            </FormControl>
        </VStack>
        <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>Volume Pekerjaan {index+1}</FormControl.Label>
                <Input value={volumePekerjaan[index]} onChangeText={(value) => {
                    volumePekerjaan[index] = value
                    setVolumePekerjaan([...volumePekerjaan], volumePekerjaan);
                }}/>
            </FormControl>
        </VStack>
       <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>Satuan Pekerjaan {index+1}</FormControl.Label>
                <Input 
                  value={satuanPekerjaan[index]}
                  onChangeText={(value) => {
                    satuanPekerjaan[index] = value
                    setSatuanPekerjaan([...satuanPekerjaan], satuanPekerjaan);
                }}/>
            </FormControl>
        </VStack>
        <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>Harga Satuan Pekerjaan {index+1}</FormControl.Label>
                <Input
                value={hargaSatuan[index]} 
                onChangeText={(value) => {
                    hargaSatuan[index] = value
                    setHargaSatuan([...hargaSatuan], hargaSatuan);
                }}/>
            </FormControl>
        </VStack>
    </ProgressStep>);
    }  
  
    return (
        <NativeBaseProvider>
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Data berhasil tersimpan!</Text>
                        <Pressable style={[styles.button, styles.buttonClose]}>
                            <Text style={styles.textStyle}>Ok</Text>
                        </Pressable>
                        </View>
                    </View>
                </Modal>
                <Text>Daftar Pekerjaan</Text>
                <ProgressSteps>
                    {arr}
                </ProgressSteps>
            </View>
        </NativeBaseProvider>
    )

}

export default ItemPekerjaan;