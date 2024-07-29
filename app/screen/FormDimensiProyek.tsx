import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { NativeBaseProvider, Button, FormControl, Select, CheckIcon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { CustomForm } from './CustomForm';

import * as MediaLibrary from'expo-media-library';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function App() {
    const params = useLocalSearchParams();

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

    const [itemPekerjaanList, setItemPekerjaanList] = useState([]);
    const [pekerjaanId, setPekerjaanId] = useState('');
    let proyek_id = params.id;

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

    useEffect(() => {
      fetchData();
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
        if(response.status === 201){
          alert('Data berhasil disimpan');
        } 
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
    <NativeBaseProvider>
      <View
        style={[
          styles.container,
          
        ]}>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Select selectedValue={pekerjaanId} 
                minWidth="200" 
                maxW="300px"
                accessibilityLabel="Pilih Jumlah Pekerjaan" 
                placeholder="Pilih Jumlah Pekerjaan" 
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="3" />
                }} mt={1} 
                onValueChange={itemValue => setPekerjaanId(itemValue)}>
                    {
                      itemPekerjaanList.map((item) => {
                        return <Select.Item label={item.nama_item_pekerjaan} value={item.id} />
                      })
                    }
            </Select>

      <CustomForm 
        label={'Panjang Pekerjaan'}
        errorMessage={'Panjang Pekerjaan harus diisi'}
        value={panjangPekerjaan}
        onChangeText={setPanjangPekerjaan} />
      
      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Panjang Pekerjaan</FormControl.Label>

        {
          previewPanjangAvailable ? 
          <View style={{marginLeft:"3%"}}>
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
            <View style={styles.cameraIcon}>
              <AntDesign name="camera" size={24} color="black" onPress={startCameraPanjang} /> 
            </View>
            }</>
        }

      <CustomForm 
        label={'Lebar Pekerjaan'}
        errorMessage={'Lebar Pekerjaan harus diisi'}
        value={lebarPekerjaan}
        onChangeText={setLebarPekerjaan} />   

      <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Lebar Pekerjaan</FormControl.Label>

        {
          previewLebarAvailable ? 
          <View style={{marginLeft:"3%"}}>
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
            <View style={styles.cameraIcon}>
              <AntDesign name="camera" size={24} color="black" onPress={startCameraLebar} /> 
            </View>
           
            }</>
        }

        <CustomForm 
          label={'Tebal Pekerjaan'}
          errorMessage={'Tebal Pekerjaan harus diisi'}
          value={tebalPekerjaan}
          onChangeText={setTebalPekerjaan} />

        <FormControl.Label _text={{bold: true}} style={{marginLeft:"3%"}}>Foto Tebal Pekerjaan</FormControl.Label>

        {
          previewTebalAvailable ? 
          <View style={{marginLeft:"3%"}}>
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
            <View style={styles.cameraIcon}>
              <AntDesign name="camera" size={24} color="black" onPress={startCameraTebal} /> 
            </View>
            }</>
        }
        <Button colorScheme="cyan" onPress={kirimData} >Submit</Button>
      </ScrollView>
    </SafeAreaView>
    </View>
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