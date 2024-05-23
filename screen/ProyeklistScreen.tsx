import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomSmallText from '../component/CustomSmallText.tsx';
import {HStack, Avatar, Box, NativeBaseProvider, VStack} from 'native-base';

const ProyeklistScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [proyeklist, setProyeklist] = useState([]); // Initial empty array of users

  const getDetail = key => {
    navigation.navigate('ProyekDetail', {proyekid: key});
  };
  useEffect(() => {
    const subscriber = firestore()
      .collection('proyek')
      .onSnapshot(querySnapshot => {
        const proyeklist = [];

        querySnapshot.forEach(documentSnapshot => {
          proyeklist.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setProyeklist(proyeklist);
        setLoading(false);
      });

    return () => subscriber();
  });
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NativeBaseProvider>
      <FlatList
        data={proyeklist}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: 'green', height: 2}} />
        )}
        renderItem={({item}) => (
          <TouchableWithoutFeedback onPress={() => getDetail(item.key)}>
            <Box>
              <HStack space={[1, 2]} justifyContent="flex-start">
                <VStack space="2.5" mt="4" px="4">
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    }}>
                    AJ
                  </Avatar>
                </VStack>
                <VStack>
                  <Text>Nama Paket: {item.nama_paket}</Text>
                  <Text>Nama PPK: {item.nama_ppk}</Text>
                  <Text>Nama Satker: {item.nama_satker}</Text>
                  <Text>Nilai Kontrak: {item.nilai_kontrak}</Text>
                  <Text>Nomor Kontrak: {item.nomor_kontrak}</Text>
                </VStack>

              </HStack>
            </Box>
          </TouchableWithoutFeedback>
        )}
      />
    </NativeBaseProvider>
  );
};

export default ProyeklistScreen;
