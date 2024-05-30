import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {Preview} from '../screen/Preview';
import * as MediaLibrary from'expo-media-library';
//import {  } from 'react-native-gesture-handler';

export default function App() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [savePermission, setSavePermission] = MediaLibrary.usePermissions();
    const [albums, setAlbums] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cuacaLokasiAmp, setCuacaLokasiAmp] = useState('');
    const [cuacaLahanPenghamparan, setCuacaLahanPenghamparan] = useState('');
    const [kondisiLahanPenghamparan, setKondisiLahanPenghamparan] = useState('');

    const cameraRef = useRef(null);
    const router = useRouter();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    const kirimData = () => {
      var data = new FormData();

      data.append('keterangan', 'aman');
      data.append('cuaca_lokasi_amp', 'cerah');
      
      data.append('foto_cuaca_amp', {
        uri: capturedImage,
        name: 'photo.jpg',
        type: 'image/jpg'
      });
      data.append('lokasi_cuaca_amp', 'Soe');
      data.append('cuaca_lahan_penghamparan', 'Aman');
      data.append('kondisi_lahan_penghamparan', 'Aman');
      data.append('foto_lahan_penghamparan', capturedImage);
      data.append('lokasi_lahan_penghamparan', 'Soe');
      data.append('foto_kondisi_lahan_penghamparan', capturedImage);
      console.log(data);
      fetch('http://192.168.0.9:8000/api/kesiapan_lahan/', {
        method: 'POST',
        body: data,
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        console.log('Response:',response.status);
      }).
      catch((error) => {
        console.error('Error:', error);
      });
    }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const __takePicture = async () => {
    //console.log("take picture");
    //console.log(cameraRef.current);
    
    if (cameraRef) {
        const options = { base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;
        if (source) {
            //console.log("picture", source);
            setPreviewVisible(true)
            //setStartCamera(false)
            setCapturedImage(source)

            if(savePermission?.status !== 'granted'){
              await MediaLibrary.requestPermissionsAsync();
            }
            const cachedAsset = await MediaLibrary.createAssetAsync(source);

            const album = await MediaLibrary.getAlbumAsync('cuaca');
            if(album == null){
              const asset = await MediaLibrary.createAssetAsync(source);
              MediaLibrary.createAlbumAsync('cuaca', asset)
                        .then(() => {console.log("Album berhasil dibuat")})
                        .catch((error) => {console.log("Album gagal dibuat", error)});
            }
          
            await MediaLibrary.addAssetsToAlbumAsync([cachedAsset], album, false)
                              .then(
                                (pathname) => {
                                  console.log("Gambar berhasil disimpan di album cuaca", pathname)
                                })
                              .catch(
                                (error) => {
                                  console.log("Gagal menyimpan gambar", error)}
                                );
            
            //setCapturedImage(image.assets[0].uri);
            
            //router.push({ pathname: '/screen/Preview/', params: {'gambar':source} });
         }
    }
    
  }
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  }

  return (
    <View style={styles.container}>
      <Button title="Submit" onPress={kirimData} />
      <TextInput
        placeholder="Cuaca Lokasi AMP"
        onChangeText={setCuacaLokasiAmp}
        value={cuacaLokasiAmp} />
      <TextInput
        placeholder="Cuaca Lokasi Penghamparan" 
        value={cuacaLahanPenghamparan}
        onChangeText={setCuacaLahanPenghamparan}/>

      <TextInput 
        placeholder="Kondisi Lahan Penghamparan"
        value={kondisiLahanPenghamparan}
        onChangeText={setKondisiLahanPenghamparan}/>

    
        {previewVisible ? (
          <View>
            <Text>Preview</Text>
            { previewVisible ?(
            <Button title="Take photo back" onPress={__retakePicture} />) 
            : (<Button title='take photo' onPress={console.log('press')}/>)}
          </View>
          ) : (
        <CameraView 
              style={styles.camera} 
              facing={facing}
              onCameraReady={onCameraReady}
              photo={true}
              ref={cameraRef}>
          <View style={styles.buttonContainer}>
          <MaterialCommunityIcons 
                  name="circle-outline"   // This is the icon which should take and save image
                  style={{ color: 'white', fontSize: 100 }}
                  onPress={__takePicture}
                  ></MaterialCommunityIcons>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
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