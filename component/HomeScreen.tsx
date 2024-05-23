import React, {useState} from 'react';
import {Text, StyleSheet, View, Button, TextInput, Alert} from 'react-native';
import CustomText from '../component/CustomText.tsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    color: 'black',
  },
});

const HomeScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const kirimData = () => {
    //Alert.alert('Data', email);
    navigation.navigate('Profile', {email: email, password: password});
  };

  const tarikData = () => {
    navigation.navigate('Proyeklist');
  };

  const formProyek = () => {
    navigation.navigate('FormProyek');
  };
  const sideNav = () => {
    navigation.navigate('SideNavigation');
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting flexDirection to "row".
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 0}}>
        <CustomText isi="Demo form" />

      </View>
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
        <Button title="Submit" onPress={kirimData} />
        <Button title="Tarik data" onPress={tarikData} />
        <Button title="Form Proyek" onPress={formProyek} />
        <Button title="Side Nav" onPress={sideNav} />
      </View>
    </View>
  );
};



export default HomeScreen;
