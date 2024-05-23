import React, {useEffect, useState} from 'react';
import {
  Container,
  Text,
  Box,
  Center,
  Image,
  VStack,
  HStack,
  Divider,
  Icon,
  NativeBaseProvider,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
//import 'react-native-svg';

const ProyekDetailScreen = ({navigation, route}) => {
  const [dataAge, setDataAge] = useState('');
  const [dataName, setDataName] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('proyek')
      .doc(route.params.proyekid)
      .get()
      .then(querySnapshot => {
        setDataAge(querySnapshot.data().age);
        setDataName(querySnapshot.data().name);
      });
  });

  return (
    <NativeBaseProvider>
      <Container>
        <VStack space={3} divider={<Divider />} w="90%">
          <HStack justifyContent="space-between">
            <Box>
              <Text>Simon Mignolet</Text>
              <Center>
                <Image
                  source={{
                    uri: 'https://wallpaperaccess.com/full/317501.jpg',
                  }}
                  alt="Alternate Text"
                  size="xl"
                />
              </Center>
              <Center
                bg="violet.500"
                _dark={{
                  bg: 'violet.400',
                }}
                _text={{
                  color: 'warmGray.50',
                  fontWeight: '700',
                  fontSize: 'xs',
                }}
                position="absolute"
                bottom="0"
                px="3"
                py="1.5"
              />
            </Box>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Nathaniel Clyne</Text>
            <Box>
              <Icon name="arrow-forward" />
              <Text>{dataAge}</Text>
              <Text>{dataName}</Text>
            </Box>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Dejan Lovren</Text>
            <Icon name="menu" />
          </HStack>
        </VStack>
      </Container>
    </NativeBaseProvider>
  );
};

export default ProyekDetailScreen;
