import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomForm } from './CustomForm';
import { NativeBaseProvider, Button, FormControl } from 'native-base';

import * as MediaLibrary from'expo-media-library';
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function FormKesiapanLahan() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [savePermission, setSavePermission] = MediaLibrary.usePermissions();
    
    const [lokasiCuacaAmp, setLokasiCuacaAmp] = useState(null);
    const [lokasiCuacaPenghamparan, setLokasiCuacaPenghamparan] = useState(null);

    const [cameraCuacaAmpOn, setCameraCuacaAmpOn] = useState(false);
    const [cameraCuacaLahanOn, setCameraCuacaLahanOn] = useState(false);
    const [cameraKondisiLahanOn, setCameraKondisiLahanOn] = useState(false);

    const [previewCuacaAmpAvailable, setPreviewCuacaAmpAvailable] = useState(false)
    const [previewCuacaLahanAvailable, setPreviewCuacaLahanAvailable] = useState(false)
    const [previewKondisiLahanAvailable, setPreviewKondisiLahanAvailable] = useState(false)

    const [capturedCuacaAmpImage, setCapturedCuacaAmpImage] = useState<any>(null)
    const [capturedCuacaPenghamparanImage, setCapturedCuacaPenghamparanImage] = useState<any>(null)
    const [capturedKondisiPenghamparanImage, setCapturedKondisiPenghamparanImage] = useState<any>(null)

    const [cuacaLokasiAmp, setCuacaLokasiAmp] = useState('');
    const [cuacaLahanPenghamparan, setCuacaLahanPenghamparan] = useState('');
    const [kondisiLahanPenghamparan, setKondisiLahanPenghamparan] = useState('');

    const [keterangan, setKeterangan] = useState('');
    
    const cameraCuacaAmpRef     = Camera;
    const cameraCuacaLahanRef   = Camera;
    const cameraKondisiLahanRef = Camera;

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.log('Permission to access location was denied');
          return;
        }
      })(); 
    });
      
 
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    const kirimData = async () => {
      const data = new FormData();

      let titikCuacaAmp = lokasiCuacaAmp.coords.latitude + "," + lokasiCuacaAmp.coords.longitude;
      let titikCuacaLahan = lokasiCuacaPenghamparan.coords.latitude + "," + lokasiCuacaPenghamparan.coords.longitude;

      const fileNameCuacaAmp = capturedCuacaAmpImage.split('/').pop();
      const fileNameKondisiLahan = capturedCuacaPenghamparanImage.split('/').pop();
      const fileNameCuacaPenghamparan = capturedKondisiPenghamparanImage.split('/').pop();
      
      //const fileType = fileName.split('.').pop();
      data.append('keterangan', keterangan);
      data.append('cuaca_lokasi_amp', cuacaLokasiAmp);
      data.append('cuaca_lahan_penghamparan',cuacaLahanPenghamparan);
      data.append('kondisi_lahan_penghamparan',kondisiLahanPenghamparan);

      data.append('lokasi_cuaca_amp', titikCuacaAmp);
      data.append('lokasi_lahan_penghamparan', titikCuacaLahan);
      
      data.append('foto_cuaca_amp', {
        uri: capturedCuacaAmpImage,
        name: fileNameCuacaAmp,
        type: 'image/*'
      } as any);

      data.append('foto_cuaca_lahan_penghamparan', {
        uri: capturedCuacaPenghamparanImage,
        name: fileNameCuacaPenghamparan,
        type: 'image/*'
      } as any);

      data.append('foto_kondisi_lahan_penghamparan', {
        uri: capturedKondisiPenghamparanImage,
        name: fileNameKondisiLahan,
        type: 'image/*'
      } as any);

      console.log('data:', data);
      fetch(
        'https://palugada.me/api/kesiapan_lahan/', {
        method: 'POST',
        body: data,
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        console.log('Response:',response);
      }).
      catch((error) => {
        console.error('Error:', error);
      });
    }
    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const __setLocation = async (type) => {
      let location = await Location.getCurrentPositionAsync();
      if(type === 'cuaca_amp'){
        setLokasiCuacaAmp(location);
      }
      else{
        setLokasiCuacaPenghamparan(location);
      }
    }
    const __savePhoto = async (photo, type) => {
      if (savePermission?.status !== 'granted') {
        await MediaLibrary.requestPermissionsAsync();
        <Button title="Give Permission" onPress={setSavePermission} />
        
      } else {
        const asset = await MediaLibrary.createAssetAsync(photo);
        MediaLibrary.createAlbumAsync('Expo', asset)
          .then(() => {
            
              if(type === 'cuaca_amp'){
                setCapturedCuacaAmpImage(asset.uri);
                setPreviewCuacaAmpAvailable(true);
              }
              else if(type === 'cuaca_lahan'){
                setCapturedCuacaPenghamparanImage(asset.uri);
                setPreviewCuacaLahanAvailable(true);
              }
              else{
                setCapturedKondisiPenghamparanImage(asset.uri);
                setPreviewKondisiLahanAvailable(true);
              }
          })
          .catch(error => {
            console.error('err', error);
          }); 
      }
    }

    const __takePicture = async (type) => {
      let cameraRef = null;
      let typeLokasi = null;
      if(type === 'cuaca_amp'){
        cameraRef = cameraCuacaAmpRef;
        typeLokasi = 'cuaca_amp';
      }
      else if(type === 'cuaca_lahan'){
        cameraRef = cameraCuacaLahanRef;
        typeLokasi = 'cuaca_lahan';
      }
      else{
        cameraRef = cameraKondisiLahanRef;
        typeLokasi = 'kondisi_lahan';
      }

      const options = { quality:0.5, base64: true, skipProcessing: false, isImageMirror: false};
      await cameraRef.current.takePictureAsync(options)
          .then((data) => {
            __setLocation(typeLokasi);
            __savePhoto(data.uri, type);
        });
    }

    const __retakePicture = () => {
      setCapturedImage(null);
      setPreviewAvailable(false);
    }

    const startCamera = (type) => {
      if(type === 'cuaca_amp'){
        cameraCuacaAmpOn === false ? setCameraCuacaAmpOn(true) : setCameraCuacaAmpOn(false);
      } else if(type === 'cuaca_lahan'){
        cameraCuacaLahanOn === false ? setCameraCuacaLahanOn(true) : setCameraCuacaLahanOn(false);
      } else if(type === 'kondisi_lahan'){
        cameraKondisiLahanOn === false ? setCameraKondisiLahanOn(true) : setCameraKondisiLahanOn(false);
      }
    }

  return (
    <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
    <ScrollView>
      
      <CustomForm 
        label="Keterangan" 
        onChangeText={setKeterangan} 
        value={keterangan} 
        errorMessage="Keterangan harus diisi" />

      <CustomForm 
        label="Cuaca Lokasi Amp" 
        onChangeText={setCuacaLokasiAmp} 
        value={cuacaLokasiAmp} 
        errorMessage="Cuaca Lokasi AMP harus diisi" />
      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Cuaca Lokasi Amp</FormControl.Label>
        {previewCuacaAmpAvailable ? (
          <View style={{marginLeft:"3%"}}>
            <Text>Preview</Text>
      
              <Image source={{uri: capturedCuacaAmpImage}} style={{width: 200, height: 200}} />
              <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
           
          </View>
          ) : <>
          {
            cameraCuacaAmpOn ? (
              
                <View style={styles.container}>
                  <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraCuacaAmpRef}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} >
                        <Feather name="circle" size={56} color="white" onPress={() => __takePicture('cuaca_amp')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                      </TouchableOpacity>
                    </View>
                  </CameraView>
                </View>
            

            ):(
              <View style={styles.cameraIcon}>
                <AntDesign name="camera" size={24} color="black" onPress={() => startCamera('cuaca_amp')} /> 
              </View>
            )}
          </>
        }

      <CustomForm 
        label="Cuaca Lahan Penghamparan" 
        onChangeText={setCuacaLahanPenghamparan} 
        value={cuacaLahanPenghamparan} 
        errorMessage="Cuaca Lahan Penghamparan harus diisi" />

      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Cuaca Lahan Penghamparan</FormControl.Label>

      {previewCuacaLahanAvailable ? (
          <View style={{marginLeft:"3%"}}>
            <Text>Preview</Text>
      
              <Image source={{uri: capturedCuacaPenghamparanImage}} style={{width: 200, height: 200}} />
              <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
           
          </View>
          ) : <>
          {
            cameraCuacaLahanOn ? (
              
                <View style={styles.container}>
                  <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraCuacaLahanRef}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} >
                        <Feather name="circle" size={56} color="white" onPress={() => __takePicture('cuaca_lahan')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                      </TouchableOpacity>
                    </View>
                  </CameraView>
                </View>
            

            ):(
            
              <View style={styles.cameraIcon}>
                <AntDesign name="camera" size={24} color="black" onPress={() => startCamera('cuaca_lahan')} /> 
              </View>
            )}
          </>
        }

      <CustomForm 
        label="Kondisi Lahan Penghamparan" 
        onChangeText={setKondisiLahanPenghamparan} 
        value={kondisiLahanPenghamparan} 
        errorMessage="Kondisi Lahan Penghamparan harus diisi" />

      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Kondisi Lahan</FormControl.Label>

      {previewKondisiLahanAvailable ? (
          <View style={{marginLeft:"3%"}}>
            <Text>Preview</Text>
      
              <Image source={{uri: capturedKondisiPenghamparanImage}} style={{width: 200, height: 200}} />
              <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
           
          </View>
          ) : <>
          {
            cameraKondisiLahanOn ? (
              
                <View style={styles.container}>
                  <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraKondisiLahanRef}>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} >
                        <Feather name="circle" size={56} color="white" onPress={() => __takePicture('kondisi_lahan')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                      </TouchableOpacity>
                    </View>
                  </CameraView>
                </View>
            

            ):(
              <View style={styles.cameraIcon}>
                <AntDesign name="camera" size={24} color="black" onPress={() => startCamera('kondisi_lahan')} /> 
              </View>
              )}
          </>
        }
        <Button onPress={kirimData} colorScheme="cyan">Submit</Button>
      </ScrollView>
    </SafeAreaView>

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