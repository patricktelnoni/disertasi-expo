import {Link,  Stack } from "expo-router";
import ListProyek from "./screen/ListProyek";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerStyle:{
      backgroundColor: '#0e7490',
  }, headerTintColor: '#fff', headerTitleStyle: {
      fontWeight: 'bold',
  }}}>
      <Stack.Screen name="Halaman Utama" />
      
    </Stack>
  );
}
