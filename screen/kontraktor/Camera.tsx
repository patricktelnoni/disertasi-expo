import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {Camera} from 'expo-camera';

const CameraView = () => {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  const handleCameraToggle = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      setIsCameraEnabled(!isCameraEnabled);
    } else {
      // Handle camera permission denied
      console.log('Camera permission denied');
    }
  };

  return (
    <View>
      {isCameraEnabled ? (
        <Camera style={{flex: 1}} type={Camera.Constants.Type.back} />
      ) : (
        <Text>Camera is disabled</Text>
      )}
      <Button
        title={isCameraEnabled ? 'Disable Camera' : 'Enable Camera'}
        onPress={handleCameraToggle}
      />
    </View>
  );
};

export default CameraView;
