import React from "react";
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default class CustomText extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.isi}</Text>
      </View>
    );
  }
}
