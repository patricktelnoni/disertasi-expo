import { Image, StyleSheet, Platform, View,TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import 'react-native-gesture-handler';
import { useState } from 'react';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View
      style={[
        styles.container,
        {
          // Try setting flexDirection to "row".
          flexDirection: 'column',
        },
      ]}>
    
      <View style={{flex: 0.5}}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.textInput}/>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.textInput}
          placeholderTextColor="#000"
        />
        <Link href='/screen/Camera'> Form Cuaca Lokasi AMP</Link>
        <Link href='/screen/FormCuacaLahan'> Form Cuaca Lahan</Link>
        <Link href='/screen/FormKondisiLahan'> Form Kondisi Lahan</Link>
        <Link href='/screen/InfoProyek'> Info Proyek</Link>
        <Link href='/screen/ListProyek'> List Proyek</Link>
        <Link href='/screen/FormDimensiProyek'> Form Proyek</Link>
      </View>
    </View>
   
    </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
