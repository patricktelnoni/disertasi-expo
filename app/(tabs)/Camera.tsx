import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function App() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)
    const [isCameraReady, setIsCameraReady] = useState(false);

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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const __takePicture = async () => {
    //console.log("take picture");
    console.log(cameraRef.current);
    
    if (cameraRef) {
        const options = { base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;
        if (source) {
            //console.log("picture", source);
            setPreviewVisible(true)
            //setStartCamera(false)
            setCapturedImage(source)
   
            console.log("Lokasi gambar", capturedImage)
            //router.push({ pathname: '/Preview/', params: {'image':source} });
            
         }
    }
    
  }
  const __savePhoto = () => {}
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  }

  return (
    <View style={styles.container}>
        {previewVisible ? (
            <View>
            <Image 
                source={{uri: capturedImage}} 
                style={{ width: 500, height: 500 }}
                />
            <Button title="Take photo back" onPress={__retakePicture} />
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
      </CameraView>)}
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