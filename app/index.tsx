import { Link } from 'expo-router';
import { HStack, VStack, NativeBaseProvider } from 'native-base';
import { Text, View, TouchableWithoutFeedback, Image, StyleSheet } from "react-native";
import React from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: '85%',
    height: '20%',
    borderRadius: 10,
    backgroundColor: 'cyan.100',
  },
});


export default function Index() {

  return (
    <NativeBaseProvider>
      <VStack
        space={10}
        alignItems="center"
        style={styles.container}
        p={3}
        flex={1}>
       
        <Image
              source={require('@/assets/images/main_page.jpg')} 
              style={styles.logo}/>
        <HStack space={2} alignItems="center">
          <TouchableWithoutFeedback>
            <Link href={{pathname: "/screen/ListProyek", params:{title:'Daftar Pekerjaan'} }}>
              <VStack alignItems="center" bg="cyan.600" rounded="md"shadow={3}>
                <FontAwesome6 name="list-ol" size={48} color="white" />
                <Text style={{fontSize:20, color:"white"}}>Daftar Pekerjaan </Text>
              </VStack>
            </Link>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Link href={{pathname: "/screen/InfoProyek", params:{title:'Tambah Pekerjaan'} }}>
              <VStack bg="cyan.600" rounded="md" alignItems="center" shadow={3}>
                <FontAwesome6 name="add" size={48} color="white" />
                  <Text style={{fontSize:20, color:"white"}}>Tambah Proyek </Text>
              </VStack>
            </Link>
          </TouchableWithoutFeedback>
        </HStack>
        
        
        </VStack>
      </NativeBaseProvider>
  
  )
}
