import React, {useRef, useState} from 'react';
import {Text, StyleSheet, View, Button, TextInput, Alert} from 'react-native';
import CustomText from '../../component/CustomText.tsx';
import firestore from '@react-native-firebase/firestore';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {Box, HStack, NativeBaseProvider} from 'native-base';
import {IconButton, MD3Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    color: 'black',
  },
});

const proyekCollection = firestore().collection('ukuran_dimensi');

const LaporanKesiapanLahanScreen = ({navigation}) => {
  const [nomorItemPekerjaan, setNomorItemPekerjaan] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [kondisiLahan, setKondisiLahan] = useState('');
  const [cuacaLokasiAmp, setCuacaLokasiAmp] = useState('');
  const [fotoCuacaLokasiAmp, setFotoCuacaLokasiAmp] = useState('');
  const [cuacaLokasiPenghamparan, setCuacaLokasiPenghamparan] = useState('');
  const [fotoKondisiLahan, setFotoKondisiLahan] = useState('');
  const [fotoCuacaLahanPenghamparan, setFotoCuacaLahanPenghamparan] = useState('');

  const kirimData = () => {
    //Alert.alert('Data', email);
    proyekCollection
      .add({
        nomorItemPekerjaan: nomorItemPekerjaan,
        keterangan: keterangan,
        kondisiLahan: kondisiLahan,
        cuacaLokasiAmp: cuacaLokasiAmp,
        fotoCuacaLokasiAmp: fotoCuacaLokasiAmp,
        cuacaLokasiPenghamparan: cuacaLokasiAmp,
        fotoKondisiLahan: fotoKondisiLahan,
      })
      .then(() => {
        console.log('Proyek Added');
      });
  };

  const tarikData = () => {
    navigation.navigate('Proyeklist');
  };
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(true);
  //const photo = await device.current.takePhoto();
  return (
    <NativeBaseProvider>
      <View
        style={[
          styles.container,
          {
            // Try setting flexDirection to "row".
            flexDirection: 'column',
          },
        ]}>
        <View style={{flex: 0}}>
          <CustomText isi="Form Dimensi Pekerjaan" />
        </View>
        <View style={{flex: 0.5}}>
          <TextInput
            placeholder="Nomor Item Pekerjaan"
            value={nomorItemPekerjaan}
            onChangeText={setNomorItemPekerjaan}
            style={styles.textInput}
            placeholderTextColor="#0A1"
          />
          <TextInput
            placeholder="Keterangan"
            value={keterangan}
            onChangeText={setKeterangan}
            style={styles.textInput}
            placeholderTextColor="#0A1"
          />
          <TextInput
            placeholder="Cuaca AMP"
            value={cuacaLokasiAmp}
            onChangeText={setCuacaLokasiAmp}
            style={styles.textInput}
            placeholderTextColor="#0A1"
          />
          <HStack space={2}>
            <IconButton
              icon="camera"
              iconColor={MD3Colors.secondary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
            <TextInput
              placeholder="Foto Cuaca AMP"
              value={fotoCuacaLokasiAmp}
              onChangeText={setFotoCuacaLokasiAmp}
              style={styles.textInput}
              editable={false}
              placeholderTextColor="#000"
            />
          </HStack>
          <TextInput
            placeholder="Cuaca lahan penghamparan"
            value={cuacaLokasiPenghamparan}
            onChangeText={setCuacaLokasiPenghamparan}
            style={styles.textInput}
            placeholderTextColor="#000"
          />
          <HStack space={2}>
            {/*showCamera && (
                <Camera
                  ref={camera}
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={showCamera}
                  photo={true}
                />
              )*/}

            <IconButton
              icon="camera"
              iconColor={MD3Colors.secondary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
            <TextInput
              placeholder="Dokumentasi Cuaca Lahan Penghamparan"
              value={fotoCuacaLahanPenghamparan}
              onChangeText={setFotoCuacaLahanPenghamparan}
              style={styles.textInput}
              editable={false}
              placeholderTextColor="#0A1"
            />
          </HStack>
          <TextInput
            placeholder="Kondisi Lahan Penghamparan"
            value={kondisiLahan}
            onChangeText={setKondisiLahan}
            style={styles.textInput}
            placeholderTextColor="#0A1"
          />
          <HStack space={2}>
            <IconButton
              icon="camera"
              iconColor={MD3Colors.secondary10}
              size={20}
              onPress={() => console.log('Pressed')}
            />
            <TextInput
              placeholder="Foto Kondisi Lahan"
              value={fotoKondisiLahan}
              editable={false}
              onChangeText={setFotoKondisiLahan}
              style={styles.textInput}
              placeholderTextColor="#0A1"
            />
          </HStack>

          <Button title="Submit" onPress={kirimData} />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default LaporanKesiapanLahanScreen;
