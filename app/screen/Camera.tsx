import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

import * as MediaLibrary from'expo-media-library';
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function App() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [savePermission, setSavePermission] = MediaLibrary.usePermissions();
    const [titikLokasi, setTitikLokasi] = useState(null);
    const [cameraOff, setCameraOff] = useState(null);
    const [previewAvailable, setPreviewAvailable] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cuacaLokasiAmp, setCuacaLokasiAmp] = useState('');


    const cameraRef = Camera;

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        setTitikLokasi(location);
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

      let titik = titikLokasi.coords.latitude + "," + titikLokasi.coords.longitude;
      const fileName = capturedImage.split('/').pop();
      //const fileType = fileName.split('.').pop();
      data.append('keterangan', 'aman saja kaka dari hp');
      data.append('cuaca_lokasi_amp', 'cerah');
      data.append('lokasi_cuaca_amp',titik);
      
      data.append('foto_cuaca_amp', {
        uri: capturedImage,
        name: fileName,
        type: 'image/*'
      } as any);

  
      
      console.log('Path:', capturedImage);
      console.log('data:', data);
      fetch(
        'http://192.168.0.9:8000/api/cuaca_lokasi_amp/', {
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

  const __savePhoto = async (photo) => {
    if (savePermission?.status !== 'granted') {
      await MediaLibrary.requestPermissionsAsync();
      <Button title="Give Permission" onPress={setSavePermission} />
      
    } else {
      const asset = await MediaLibrary.createAssetAsync(photo);
      MediaLibrary.createAlbumAsync('Expo', asset)
        .then(() => {

            setCapturedImage(asset.uri);
            setPreviewAvailable(true);
         
          
         
          //router.push({pathname:'/screen/Preview', params: {gambar: asset.uri}});
        })
        .catch(error => {
          console.error('err', error);
        }); 
    }
  }

  const __takePicture = async () => {

    if (cameraRef) {
        const options = { quality:0.5, base64: true, skipProcessing: false, isImageMirror: false};
        await cameraRef.current.takePictureAsync(options)
        .then((data) => {
          __savePhoto(data.uri);
        });
        
    }
    
  }
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewAvailable(false);
  }

  return (
    <View style={styles.container}>
      <Button title="Submit" onPress={kirimData} />
      <TextInput
        placeholder="Cuaca Lokasi AMP"
        onChangeText={setCuacaLokasiAmp}
        value={cuacaLokasiAmp} />

        {previewAvailable ? (
          <View>
            <Text>Preview</Text>
      
              <Image source={{uri: capturedImage}} style={{width: 200, height: 200}} />
              <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
           
          </View>
          ) : (
            <View style={styles.container}>
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
            </View>
        )}
      
    </View>
    
  );
}

const styles = StyleSheet.create({
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