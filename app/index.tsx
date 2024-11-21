import { Stack, useNavigation, Link } from 'expo-router';
import { Text, View } from "react-native";
import React from "react";



export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Index</Text>
      <Link href={{pathname: "/screen/ListProyek", params:{title:'Daftar Pekerjaan'} }}>Daftar Pekerjaan </Link>
      <Link href={{pathname: "/screen/InfoProyek", params:{title:'Tambah Pekerjaan'} }}>Form Tambah Proyek </Link>
      </View>
    
  )
}
