import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { NativeBaseProvider, Button, FormControl, Select, CheckIcon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { CustomForm } from './CustomForm';

import * as Location from 'expo-location';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function App() {
    const params = useLocalSearchParams();

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    
    const [titikLokasiPanjang, setTitikLokasiPanjang] = useState('');
    const [titikLokasiLebar, setTitikLokasiLebar] = useState('');
    const [titikLokasiTebal, setTitikLokasiTebal] = useState('');
       
    const [cameraOn, setCameraOn] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const [previewPanjangAvailable, setPreviewPanjangAvailable] = useState(false)
    const [previewLebarAvailable, setPreviewLebarAvailable] = useState(false);
    const [previewTebalAvailable, setPreviewTebalAvailable] = useState(false);
    
    const [capturedPanjangImage, setCapturedPanjangImage] = useState<any>(null)
    const [capturedLebarImage, setCapturedLebarImage] = useState<any>(null)
    const [capturedTebalImage, setCapturedTebalImage] = useState<any>(null)

    const [tipeGambar, setTipeGambar] = useState('');

    const [panjangPekerjaan, setPanjangPekerjaan] = useState('');
    const [lebarPekerjaan, setLebarPekerjaan] = useState('');
    const [tebalPekerjaan, setTebalPekerjaan] = useState('');

    const [itemPekerjaanList, setItemPekerjaanList] = useState([]);
    const [pekerjaanId, setPekerjaanId] = useState('');
    let proyek_id = params.id;
    let location = null;
    const cameraRef = Camera;

    const fetchData = async () => {
      try {
          //const response = await fetch('http://192.168.0.9:8000/api/item_pekerjaan/'+proyek_id+'');
          const response = await fetch('https://palugada.me/api/item_pekerjaan/'+proyek_id+''); 
          const jsonData = await response.json();
          setItemPekerjaanList(jsonData.data);
          //console.log(jsonData.data);
      } catch (error) {
          console.error(error);
      }
    };

    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        console.log('Permission to access location was denied');
        return;
      }
      location = await Location.getCurrentPositionAsync();
      //location = await Location.getLastKnownPositionAsync();
    }

    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
          console.log('Permission to access camera was denied');
          return;
      }
    }

    useEffect(() => {
      
      getLocationPermission();
      getCameraPermission();
      fetchData();
    });
      

    const kirimData = async () => {
      
      const data = new FormData();

      let titikPanjang  = titikLokasiPanjang.coords.latitude + "," + titikLokasiPanjang.coords.longitude;
      let titikLebar    = titikLokasiLebar.coords.latitude + "," + titikLokasiLebar.coords.longitude;
      let titikTebal    = titikLokasiTebal.coords.latitude + "," + titikLokasiTebal.coords.longitude;
      
      console.log(titikPanjang);
      const fileNamePanjang = capturedPanjangImage.split('/').pop();
      const fileNameLebar   = capturedLebarImage.split('/').pop();
      const fileNameTebal   = capturedTebalImage.split('/').pop();   


      data.append('proyek_id', proyek_id);
      data.append('panjang_pekerjaan', panjangPekerjaan);
      data.append('lebar_pekerjaan', lebarPekerjaan);
      data.append('tebal_pekerjaan', tebalPekerjaan);
      data.append('id_item_pekerjaan', pekerjaanId);

      data.append('lokasi_foto_panjang',titikPanjang);
      data.append('lokasi_foto_lebar',titikLebar);
      data.append('lokasi_foto_tebal',titikTebal);
      
      data.append('foto_panjang', {
        uri: capturedPanjangImage,
        name: fileNamePanjang,
        type: 'image/*'
      } as any);

      data.append('foto_lebar', {
        uri: capturedLebarImage,
        name: fileNameLebar,        type: 'image/*'
      } as any);

      data.append('foto_tebal', {
        uri: capturedTebalImage,
        name: fileNameTebal,
        type: 'image/*'
      } as any);

      console.log(data);
      setIsSending(true);

      await axios.post(
        'https://palugada.me/api/dimensi_lahan/', 
        //'http://192.168.0.7:8000/api/dimensi_lahan/',
        data,
        {
          headers:{
          'Content-Type': 'multipart/form-data',
          }
        }
      ).then((response) => {
        console.log('Response:',response);
        if(response.status === 201){
          setIsSending(false);
          alert('Data berhasil disimpan');
          
          return router.push({pathname:'/screen/ProyekList'})
        } 
      }).
      catch((error) => {
        console.error('Error:', error);
      });
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const startCamera = (tipe) => {
      cameraOn === false ? setCameraOn(true) : setCameraOn(false);
      setTipeGambar(tipe);
    }

    const __takePicture = async () => {

      if (cameraRef) {
          const options = { quality:0.5, base64: true, skipProcessing: false, isImageMirror: false};
          await cameraRef.current.takePictureAsync(options)
          .then((data) => {
            setCameraOn(false);
            if(tipeGambar == 'panjang'){
              setCapturedPanjangImage(data.uri);
              setPreviewPanjangAvailable(true);
              setTitikLokasiPanjang(location);
            }
            if(tipeGambar == 'lebar'){
              setCapturedLebarImage(data.uri);
              setPreviewLebarAvailable(true);
              setTitikLokasiLebar(location);
            }
            if(tipeGambar == 'tebal'){
              setCapturedTebalImage(data.uri);
              setPreviewTebalAvailable(true);
              setTitikLokasiTebal(location);
            }
          });
          
      }
      
    }

    const __retakePicture = () => {
        setCapturedPanjangImage(null);
        setPreviewPanjangAvailable(false);
    }

  return (
    <NativeBaseProvider>
      { 
        cameraOn ?
          <View style={{flex: 1}}>
                <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} >
                            <Feather name="circle" size={56} color="white" onPress={__takePicture} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
          </View>: 
          <View
        style={[
          styles.container,
          
        ]}>
          
    
      <ScrollView>
        <Select selectedValue={pekerjaanId} 
                minWidth="200" 
                maxW="300px"
                accessibilityLabel="Pilih Item Pekerjaan" 
                placeholder="Pilih Item Pekerjaan" 
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="3" />
                }} mt={1} 
                onValueChange={itemValue => setPekerjaanId(itemValue)}>
                    {
                      itemPekerjaanList.map((item) => {
                        return <Select.Item label={item.nama_item_pekerjaan} value={item.id} key={item.id} />
                      })
                    }
        </Select>

      <CustomForm 
        label='Panjang Pekerjaan'
        errorMessage='Panjang Pekerjaan harus diisi'
        value={panjangPekerjaan}
        onChangeText={setPanjangPekerjaan} />
      
      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Panjang Pekerjaan</FormControl.Label>

        {
          previewPanjangAvailable ? 
          <View style={{marginLeft:"3%"}}>
            <Text>Preview</Text>
                <Image source={{uri: capturedPanjangImage}} style={{width: 200, height: 200}} />       
            </View>
          : <>{
            <View style={styles.cameraIcon}>
              <AntDesign name="camera" size={24} color="black" onPress={() => startCamera('panjang')} /> 
            </View>
            }</>
        }

      <CustomForm 
        label='Lebar Pekerjaan'
        errorMessage='Lebar Pekerjaan harus diisi'
        value={lebarPekerjaan}
        onChangeText={setLebarPekerjaan} />   

      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Lebar Pekerjaan</FormControl.Label>

        {
          previewLebarAvailable ? 
          <View style={{marginLeft:"3%"}}>
            <Text>Preview</Text>
                <Image source={{uri: capturedLebarImage}} style={{width: 200, height: 200}} />
            </View>
          : <>{
  
            <View style={styles.cameraIcon}>
              <AntDesign name="camera" size={24} color="black" onPress={() => startCamera('lebar')} /> 
            </View>
           
            }</>
        }

        <CustomForm 
          label='Tebal Pekerjaan'
          errorMessage='Tebal Pekerjaan harus diisi'
          value={tebalPekerjaan}
          onChangeText={setTebalPekerjaan} />

        <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Tebal Pekerjaan</FormControl.Label>

        {
          previewTebalAvailable ? 
          <View style={{marginLeft:"3%"}}>
            <Text>Preview</Text>
                <Image source={{uri: capturedTebalImage}} style={{width: 200, height: 200}} />            
            </View>
          : <>{
            <View style={styles.cameraIcon}>
              <AntDesign name="camera" size={24} color="black" onPress={() => startCamera('tebal')} /> 
            </View>
            }</>
        }
        <Button colorScheme="cyan" onPress={kirimData} disabled={isSending} width="90%">Submit</Button>
      </ScrollView>
   
    </View>
      
      }
      
      
    </NativeBaseProvider>
    
  );
}

const styles = StyleSheet.create({
  cameraIcon:{
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});