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
import { IconButton, MD3Colors } from 'react-native-paper';

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

const LaporanDimensiPekerjaanScreen = ({navigation}) => {
  const [peruntukan, setPeruntukan] = useState('');
  const [panjangPekerjaan, setPanjangPekerjaan] = useState('');
  const [fotoPengukuranPanjang, setFotoPengukuranPanjang] = useState('');
  const [lebarPekerjaan, setLebarPekerjaan] = useState('');
  const [fotoPengukuranLebar, setFotoPengukuranLebar] = useState('');
  const [tebalPekerjaan, setTebalPekerjaan] = useState('');
  const [fotoPengukuranTebal, setFotoPengukuranTebal] = useState('');

  const kirimData = () => {
    //Alert.alert('Data', email);
    proyekCollection
      .add({
        peruntukan: peruntukan,
        panjang_pekerjaan: panjangPekerjaan,
        foto_pengukuran_panjang: fotoPengukuranPanjang,
        lebar_pekerjaan: lebarPekerjaan,
        foto_pengukuran_lebar: fotoPengukuranLebar,
        tebal_pekerjaan: tebalPekerjaan,
        foto_pengukuran_tebal: fotoPengukuranTebal,
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
            placeholder="Peruntukan"
            value={peruntukan}
            onChangeText={setPeruntukan}
            style={styles.textInput}
            placeholderTextColor="#0A1"
          />
    
          <TextInput
            placeholder="Panjang Pekerjaan (m)"
            placeholderTextColor="#000"
            value={panjangPekerjaan}
            onChangeText={setPanjangPekerjaan}
            style={styles.textInput}
          />
          <HStack space={2}>
            <IconButton
                icon="camera"
                
                iconColor={MD3Colors.secondary10}
                size={20}
                onPress={() => console.log('Pressed')}
              />
            <TextInput
              placeholder="Foto Pengukuran Panjang"
              value={fotoPengukuranPanjang}
              onChangeText={setFotoPengukuranPanjang}
              style={styles.textInput}
              editable={false}
              placeholderTextColor="#000"
            />
          
          </HStack>
          <TextInput
            placeholder="Lebar Pekerjaan (m)"
            value={lebarPekerjaan}
            onChangeText={setLebarPekerjaan}
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
              placeholder="Dokumentasi Pengukuran Lebar"
              value={fotoPengukuranLebar}
              onChangeText={setFotoPengukuranLebar}
              style={styles.textInput}
              editable={false}
              placeholderTextColor="#0A1"
            />
            
          </HStack>
          <TextInput
            placeholder="Tebal Pekerjaan (m)"
            value={tebalPekerjaan}
            onChangeText={setTebalPekerjaan}
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
              placeholder="Dokumentasi Pengukuran Tebal"
              value={fotoPengukuranTebal}
              editable={false}
              onChangeText={setFotoPengukuranTebal}
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

export default LaporanDimensiPekerjaanScreen;
