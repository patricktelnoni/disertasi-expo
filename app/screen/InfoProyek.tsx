import React, {useState} from 'react';
import {
  Text, 
  StyleSheet, 
  View,  
  ScrollView } from 'react-native';
import {Button, NativeBaseProvider, Select, CheckIcon} from 'native-base';
import {router, useLocalSearchParams, Stack} from 'expo-router';
import { CustomForm } from './CustomForm';
import { Box, HStack } from 'native-base';
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

const FormProyekScreen = () => {
  const params = useLocalSearchParams();
  const [namaPaket, setNamaPaket] = useState('');
  const [namaPpk, setNamaPpk] = useState('');
  const [namaSatker, setNamaSatker] = useState('');
  const [nilaiKontrak, setNilaiKontrak] = useState('');
  const [nomorKontrak, setNomorKontrak] = useState('');
  const [masaPelaksanaan, setMasaPelaksanaan] = useState('');
  const [lokasiPekerjaan, setLokasiPekerjaan] = useState('');
  const [jumlahPekerjaan, setJumlahPekerjaan] = useState('');
  const [tanggalPho, setTanggalPho] = useState('2024-05-28');
  const [tanggalKontrak, setTanggalKontrak] = useState('2024-05-29');
  
 
  const kirimData = () => {
    //var data = new FormData();
    //const data: string[] = [];
    let data = [{
                'nama_paket': namaPaket, 
                'nama_ppk': namaPpk, 
                'nama_satker': namaSatker, 
                'nilai_kontrak': nilaiKontrak, 
                'nomor_kontrak': nomorKontrak, 
                'masa_pelaksanaan': masaPelaksanaan, 
                'tanggal_pho': tanggalPho, 
                'tanggal_kontrak': tanggalKontrak, 
                'lokasi_pekerjaan': lokasiPekerjaan
              }]; 
    
    
    //console.log('Data:', data);

    router.push({pathname:'/screen/ItemPekerjaan', params: {
          jumlahItem: jumlahPekerjaan, 
          namaPaket: namaPaket, 
          namaSatker: namaSatker, 
          namaPpk: namaPpk, 
          nilaiKontrak: nilaiKontrak, 
          nomorKontrak: nomorKontrak, 
          tanggalPho: tanggalPho, 
          masaPelaksanaan: masaPelaksanaan, 
          lokasiPekerjaan: lokasiPekerjaan,
          tanggalKontrak: tanggalKontrak, 

    }});
    
  }

  const pindahListProyek = () => {
    //setModalVisible(!modalVisible);
    router.push({pathname:'/screen/ListProyek'});
  }

  
  
  return (
    <NativeBaseProvider>
      <Stack.Screen options={{title: params.title}}/>
      <View
        style={[
          styles.container, 
        ]}>
        
        <View style={{flex: 0}}>
          <Text style={{fontWeight: "bold", fontSize:24}}>Form tambah proyek</Text>
        
        </View>
        <View >
          <ScrollView>
            <CustomForm 
              label='Nama Paket' 
              errorMessage='Nama Paket harus diisi'
              value={namaPaket}
              onChangeText={setNamaPaket}/>

            <CustomForm 
              label='Nama PPK' 
              errorMessage='Nama PPK harus diisi'
              value={namaPpk}
              onChangeText={setNamaPpk}/>

            <CustomForm 
              label='Nama Satker' 
              errorMessage='Nama Satker harus diisi'
              value={namaSatker}
              onChangeText={setNamaSatker}/>

            <CustomForm 
              label='Nilai Kontrak' 
              errorMessage='Nilai Kontrak harus diisi'
              value={nilaiKontrak}
              onChangeText={setNilaiKontrak}/>

            <CustomForm 
              label='Nomor Kontrak' 
              errorMessage='Nomor Kontrak harus diisi'
              value={nomorKontrak}
              onChangeText={setNomorKontrak}/>

            <CustomForm 
              label='Masa pelaksanaan' 
              errorMessage='Masa Pelaksanaan harus diisi'
              value={masaPelaksanaan}
              onChangeText={setMasaPelaksanaan}/>

            <CustomForm 
              label='Lokasi Pekerjaan' 
              errorMessage='Lokasi Pekerjaan harus diisi'
              value={lokasiPekerjaan}
              onChangeText={setLokasiPekerjaan}/>

            <Select selectedValue={jumlahPekerjaan} 
                minWidth="200" 
                maxW="300px"
                accessibilityLabel="Pilih Jumlah Pekerjaan" 
                placeholder="Pilih Jumlah Pekerjaan" 
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="3" />
                }} mt={1} 
                onValueChange={itemValue => setJumlahPekerjaan(itemValue)}>
                      <Select.Item label="1" value="1" />
                      <Select.Item label="2" value="2" />
                      <Select.Item label="3" value="3" />
                      <Select.Item label="4" value="4" />
                      <Select.Item label="5" value="5" />
            </Select>
            <Button onPress={kirimData} colorScheme="cyan">Submit</Button> 

            </ScrollView>
        </View>
      </View>
    </NativeBaseProvider>
  );
};
 
export default FormProyekScreen;

