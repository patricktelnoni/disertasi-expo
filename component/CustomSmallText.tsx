import React from "react";
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default class CustomSmallText extends React.Component {
  render() {
    return (
        <Text style={styles.text}>{this.props.isi}</Text>
    );
  }
}
