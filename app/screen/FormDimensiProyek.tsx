import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

import * as MediaLibrary from'expo-media-library';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function App() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [savePermission, setSavePermission] = MediaLibrary.usePermissions();
    
    const [titikLokasiPanjang, setTitikLokasiPanjang] = useState(null);
    const [titikLokasiLebar, setTitikLokasiLebar] = useState(null);
    const [titikLokasiTebal, setTitikLokasiTebal] = useState(null);
    
    const [cameraPanjangOn, setCameraPanjangOn] = useState(false);
    const [cameraLebarOn, setCameraLebarOn] = useState(false);
    const [cameraTebalOn, setCameraTebalOn] = useState(false);
    
    const [previewPanjangAvailable, setPreviewPanjangAvailable] = useState(false)
    const [previewLebarAvailable, setPreviewLebarAvailable] = useState(false);
    const [previewTebalAvailable, setPreviewTebalAvailable] = useState(false);
    
    const [capturedPanjangImage, setCapturedPanjangImage] = useState<any>(null)
    const [capturedLebarImage, setCapturedLebarImage] = useState<any>(null)
    const [capturedTebalImage, setCapturedTebalImage] = useState<any>(null)
    
    const [isCameraReady, setIsCameraReady] = useState(false);

    const [panjangPekerjaan, setPanjangPekerjaan] = useState('');
    const [lebarPekerjaan, setLebarPekerjaan] = useState('');
    const [tebalPekerjaan, setTebalPekerjaan] = useState('');

    const cameraPanjangRef  = Camera;
    const cameraLebarRef    = Camera;
    const cameraTebalRef    = Camera;

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

      let titikPanjang  = titikLokasiPanjang.coords.latitude + "," + titikLokasiPanjang.coords.longitude;
      let titikLebar    = titikLokasiLebar.coords.latitude + "," + titikLokasiLebar.coords.longitude;
      let titikTebal    = titikLokasiTebal.coords.latitude + "," + titikLokasiTebal.coords.longitude;
      
      const fileNamePanjang = capturedPanjangImage.split('/').pop();
      const fileNameLebar   = capturedLebarImage.split('/').pop();
      const fileNameTebal   = capturedTebalImage.split('/').pop();
      //const fileType = fileName.split('.').pop();

      data.append('peruntukan', 'Proyek kaka ee');
      
      data.append('panjang_pekerjaan', panjangPekerjaan);
      data.append('lebar_pekerjaan', lebarPekerjaan);
      data.append('tebal_pekerjaan', tebalPekerjaan);

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
        name: fileNameLebar,
        type: 'image/*'
      } as any);

      data.append('foto_tebal', {
        uri: capturedTebalImage,
        name: fileNameTebal,
        type: 'image/*'
      } as any);

      console.log('data:', data);
      
      axios.post(
        'https://palugada.me/api/dimensi_lahan/', 
        data,
        {
          headers:{
          'Content-Type': 'multipart/form-data',
          }
        }
      ).then((response) => {
        console.log('Response:',response);
      }).
      catch((error) => {
        console.error('Error:', error);
      });
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const __savePhoto = async (photo, type) => {
        if (savePermission?.status !== 'granted') {
        await MediaLibrary.requestPermissionsAsync();
        <Button title="Give Permission" onPress={setSavePermission} />
        
        } else {
        const asset = await MediaLibrary.createAssetAsync(photo);
        MediaLibrary.createAlbumAsync('Expo', asset)
            .then(() => {
                if(type === 'panjang'){
                    setCapturedPanjangImage(asset.uri);
                    setPreviewPanjangAvailable(true);
                }
                else if(type === 'lebar'){
                    setCapturedLebarImage(asset.uri);
                    setPreviewLebarAvailable(true);
                }
                else{
                    setCapturedTebalImage(asset.uri);
                    setPreviewTebalAvailable(true);
                }
                
            //router.push({pathname:'/screen/Preview', params: {gambar: asset.uri}});
            })
            .catch(error => {
            console.error('err', error);
            }); 
        }
    }

    const startCameraPanjang = () => {
        cameraPanjangOn === false ? setCameraPanjangOn(true) : setCameraPanjangOn(false);
    }

    const startCameraLebar = () => {
        cameraLebarOn === false ? setCameraLebarOn(true) : setCameraLebarOn(false);
    }

    const startCameraTebal = () => {
        cameraTebalOn === false ? setCameraTebalOn(true) : setCameraTebalOn(false);
    }

    const __setLocation = async(type) => {
        let location = await Location.getCurrentPositionAsync();

        if(type === 'panjang') setTitikLokasiPanjang(location);
        else if(type === 'lebar') setTitikLokasiLebar(location);
        else setTitikLokasiTebal(location);

    }

    const __takePicture = async (type) => {
        const options = { quality:0.5, base64: true, skipProcessing: false, isImageMirror: false};
        if(type === 'panjang'){
            await cameraPanjangRef.current.takePictureAsync(options)
                .then((data) => {
                    setCameraPanjangOn(false);
                    __setLocation('panjang');
                    __savePhoto(data.uri, 'panjang');
                });
        }
        else if(type === 'lebar'){
            await cameraLebarRef.current.takePictureAsync(options)
                .then((data) => {
                    setCameraLebarOn(false);
                    __setLocation('lebar');
                    __savePhoto(data.uri, 'lebar');
                });
        }
        else{
            await cameraTebalRef.current.takePictureAsync(options)
                .then((data) => {
                    setCameraTebalOn(false);
                    __setLocation('tebal');
                    __savePhoto(data.uri, 'tebal');
                });
            }
    }

    const takePicturePanjang  = () => {__takePicture('panjang');}
    const takePictureLebar    = () => {__takePicture('lebar');}
    const takePictureTebal    = () => {__takePicture('tebal');}

    const __retakePicture = () => {
        setCapturedPanjangImage(null);
        setPreviewPanjangAvailable(false);
    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Button title="Submit" onPress={kirimData} />
      <TextInput
        placeholder="Panjang Pekerjaan"
        onChangeText={setPanjangPekerjaan}
        value={panjangPekerjaan} />
        {
          previewPanjangAvailable ? 
          <View>
            <Text>Preview</Text>
                <Image source={{uri: capturedPanjangImage}} style={{width: 200, height: 200}} />
                <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
            
            </View>
          : <>{
            cameraPanjangOn ?   
            <View style={styles.container}>
                <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraPanjangRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} >
                            <Feather name="circle" size={56} color="white" onPress={takePicturePanjang} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>:
            <AntDesign name="camera" size={24} color="black" onPress={startCameraPanjang} /> 
           
            }</>
        }

        <TextInput
            placeholder="Lebar Pekerjaan"
            onChangeText={setLebarPekerjaan}
            value={lebarPekerjaan} />
        {
          previewLebarAvailable ? 
          <View>
            <Text>Preview</Text>
                <Image source={{uri: capturedLebarImage}} style={{width: 200, height: 200}} />
                <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
            
            </View>
          : <>{
            cameraLebarOn ?   
            <View style={styles.container}>
                <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraLebarRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} >
                            <Feather name="circle" size={56} color="white" onPress={takePictureLebar} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>:
            <AntDesign name="camera" size={24} color="black" onPress={startCameraLebar} /> 
           
            }</>
        }

        <TextInput
            placeholder="Tebal Pekerjaan"
            onChangeText={setTebalPekerjaan}
            value={tebalPekerjaan} />
        {
          previewTebalAvailable ? 
          <View>
            <Text>Preview</Text>
                <Image source={{uri: capturedTebalImage}} style={{width: 200, height: 200}} />
                <View>
            <Button title="Take photo back" onPress={__retakePicture} />
            </View> 
            
            </View>
          : <>{
            cameraTebalOn ?   
            <View style={styles.container}>
                <CameraView style={styles.camera} photo={true} facing={facing} ref={cameraTebalRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} >
                            <Feather name="circle" size={56} color="white" onPress={takePictureTebal} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons name="camera-flip" size={56} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>:
            <AntDesign name="camera" size={24} color="black" onPress={startCameraTebal} /> 
           
            }</>
        }
        
      </ScrollView>
    </SafeAreaView>
    
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