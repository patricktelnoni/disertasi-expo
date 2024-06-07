import React, {useState} from 'react';
import {Text, StyleSheet, View, Button, TextInput} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    color: 'black',
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
    
    fetch('http://10.62.56.18:8000/api/info_proyek/', {
      method: 'POST',
      body: data,
    }).then((response) => {
      console.log('Response:',response);
    }).
    catch((error) => {
      console.error('Error:', error);
    });
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