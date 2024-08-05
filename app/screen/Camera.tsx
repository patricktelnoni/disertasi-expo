import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
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

    const [titikLokasi, setTitikLokasi] = useState(null);

    const [previewAvailable, setPreviewAvailable] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)

    const [cuacaLokasiAmp, setCuacaLokasiAmp] = useState('');


    const cameraRef = Camera;
    const params = useGlobalSearchParams<{tipePengukuran: string}>();

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
     
    }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const __sendBackPhoto = async (photo) => {
    
  }

  const __takePicture = async () => {

    if (cameraRef) {
        const options = { quality:0.5, base64: true, skipProcessing: false, isImageMirror: false};
        await cameraRef.current.takePictureAsync(options)
        .then((data) => {
          __sendBackPhoto(data.uri);
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