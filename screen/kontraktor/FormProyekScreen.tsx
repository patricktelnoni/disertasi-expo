import React, {useState} from 'react';
import {Text, StyleSheet, View, Button, TextInput, Alert} from 'react-native';
import CustomText from '../component/CustomText.tsx';
import firestore from "@react-native-firebase/firestore";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    color: 'black',
  },
});

const proyekCollection = firestore().collection('proyek');

const FormProyekScreen = ({navigation}) => {
  const [namaPaket, setNamaPaket] = useState('');
  const [namaPpk, setNamaPpk] = useState('');
  const [namaSatker, setNamaSatker] = useState('');
  const [nilaiKontrak, setNilaiKontrak] = useState('');
  const [nomorKontrak, setNomorKontrak] = useState('');
  const kirimData = () => {
    //Alert.alert('Data', email);
    proyekCollection.add({
      nama_paket: namaPaket,
      nama_ppk: namaPpk,
      nama_satker: namaSatker,
      nilai_kontrak: nilaiKontrak,
      nomor_kontrak: nomorKontrak,
    }).then(() => {
      console.log('Proyek Added');
    });
  };

  const tarikData = () => {
    navigation.navigate('Proyeklist');
  };
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
        <CustomText isi="Form tambah proyek" />
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
        <Button title="Submit" onPress={kirimData} />
      </View>
    </View>
  );
};

export default FormProyekScreen;
