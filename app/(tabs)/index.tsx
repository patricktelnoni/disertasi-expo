import { Image, StyleSheet, Platform, View,TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import 'react-native-gesture-handler';
import { useState } from 'react';
import { HStack, Center, Stack, NativeBaseProvider, Box } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (
    <NativeBaseProvider>
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
          <Stack space={2} alignItems="center" direction={"column"}>
            <HStack space={2} alignItems="center">
              <Link href='/screen/InfoProyek'> 
                <Center size={32} bg="primary.400" rounded="md" _text={{
                color: "white"
              }} shadow={3}>
                  <Feather name="info" size={36} color="white" />Info Proyek
                </Center>
              </Link>
              
              
              <Link href='/screen/ListProyek'> 
                <Center size={32} bg="fuchsia.400" rounded="md" _text={{
                  color: "white"
                }} shadow={3}>
                  <FontAwesome name="list-alt" size={36} color="white" />List Proyek
                </Center>
              </Link>               
            </HStack>

            <HStack space={2} alignItems="center">
              <Box>
                <Link href='/screen/FormDimensiProyek'> 
                  <Center size={32} bg="secondary.400" rounded="md" _text={{
                    color: "white"
                  }} shadow={3}>
                    <AntDesign name="form" size={36} color="white" /> Form Dimensi Proyek
                  </Center>
                </Link>
              </Box>
              <Box>
                <Link href='/screen/FormKesiapanLahan'> 
                  <Center size={32} bg="emerald.400" rounded="md" _text={{
                    color: "white"
                  }} shadow={3}>
                    <FontAwesome name="wpforms" size={36} color="white" /> Form Kesiapan Lahan
                  </Center>
                </Link>
              </Box>
            </HStack>
          </Stack>      
        </View>
    </View>
   
    </ParallaxScrollView>
</NativeBaseProvider>
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
