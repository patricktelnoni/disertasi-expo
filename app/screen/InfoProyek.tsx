import React, {useState} from 'react';
import {
  Text, 
  StyleSheet, 
  View, 
  Button, 
  TextInput, 
  Modal, 
  Pressable, 
  ImageBackground } from 'react-native';
import {router} from 'expo-router';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    <View
      style={[
        styles.container,
        {
          // Try setting flexDirection to "row".
          flexDirection: 'column',
        },
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
      <View style={{flex: 0.5}}>
        <TextInput
          placeholder="Nama Paket"
          placeholderTextColor="#000"
          value={namaPaket}
          onChangeText={setNamaPaket}
          style={styles.textInput}
        />
        
        <TextInput
          placeholder="Nama PPK"
          value={namaPpk}
          onChangeText={setNamaPpk}
          style={styles.textInput}
          placeholderTextColor="#000"
        />
        <TextInput
          placeholder="Nama Satker"
          value={namaSatker}
          onChangeText={setNamaSatker}
          style={styles.textInput}
          placeholderTextColor="#000"
        />
        <TextInput
          placeholder="Nilai Kontrak"
          value={nilaiKontrak}
          onChangeText={setNilaiKontrak}
          style={styles.textInput}
          placeholderTextColor="#000"
        />
        <TextInput
          placeholder="Nomor Kontrak"
          value={nomorKontrak}
          onChangeText={setNomorKontrak}
          style={styles.textInput}
          placeholderTextColor="#0A1"
        />
        <TextInput
          placeholder="Masa Pelaksanaan"
          value={masaPelaksanaan}
          onChangeText={setMasaPelaksanaan}
          style={styles.textInput}
          placeholderTextColor="#0A1"
        />
        <TextInput
          placeholder="Lokasi Pekerjaan"
          value={lokasiPekerjaan}
          onChangeText={setLokasiPekerjaan}
          style={styles.textInput}
          placeholderTextColor="#0A1"
        />
        <Button title="Submit" onPress={kirimData} />
      </View>
    </View>
  );
};
 
export default FormProyekScreen;

