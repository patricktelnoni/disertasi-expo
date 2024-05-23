import React, { useRef, useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

function CameraView() {
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const [showCamera, setShowCamera] = useState(true);

  if (device == null) {
    return <View><Text>No camera device available</Text></View>;
  }

  return (
    <View style={styles.container}>
      {showCamera && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
        />
      )}
      <Button title="Toggle Camera" onPress={() => setShowCamera(!showCamera)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraView;
