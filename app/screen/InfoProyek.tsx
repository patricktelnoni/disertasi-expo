import React, {useState} from 'react';
import {
  Text, 
  StyleSheet, 
  View,  
  TextInput, 
  Modal, 
  Pressable, 
  ScrollView } from 'react-native';
import {Button, NativeBaseProvider} from 'native-base';
import {router} from 'expo-router';
import { CustomForm } from './CustomForm';



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
  const [namaPaket, setNamaPaket] = useState('');
  const [namaPpk, setNamaPpk] = useState('');
  const [namaSatker, setNamaSatker] = useState('');
  const [nilaiKontrak, setNilaiKontrak] = useState('');
  const [nomorKontrak, setNomorKontrak] = useState('');
  const [masaPelaksanaan, setMasaPelaksanaan] = useState('');
  const [lokasiPekerjaan, setLokasiPekerjaan] = useState('');
  const [tanggalPho, setTanggalPho] = useState('2024-05-28');
  const [tanggalKontrak, setTanggalKontrak] = useState('2024-05-29');
  const [modalVisible, setModalVisible] = useState(false);
 
  const kirimData = () => {
    var data = new FormData();
    data.append('nama_paket', namaPaket); 
    data.append('nama_ppk', namaPpk);
    data.append('nama_satker', namaSatker);
    data.append('nilai_kontrak', nilaiKontrak);
    data.append('nomor_kontrak', nomorKontrak);
    data.append('masa_pelaksanaan', masaPelaksanaan);
    data.append('tanggal_pho', tanggalPho);
    data.append('tanggal_kontrak', tanggalKontrak);
    data.append('lokasi_pekerjaan', lokasiPekerjaan);
    
    //console.log('Data:', data);
    fetch('https://palugada.me/api/info_proyek/', {
      method: 'POST',
      body: data,
    }).then((response) => {
      console.log('Response:',response);
      if(response.status == 200){
        setModalVisible(true);
      }
    }).
    catch((error) => {
      console.error('Error:', error);
    });
  }

  const pindahListProyek = () => {
    setModalVisible(!modalVisible);
    router.push({pathname:'/screen/ListProyek'});
  }

  
  
  return (
    <NativeBaseProvider>
      <View
        style={[
          styles.container,
          
        ]}>
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
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={pindahListProyek}>
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={{flex: 0}}>
          <Text>Form tambah proyek</Text>
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

            <Button onPress={kirimData} colorScheme="cyan">Submit</Button> 

            </ScrollView>
        </View>
      </View>
    </NativeBaseProvider>
  );
};
 
export default FormProyekScreen;

