import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';

const Preview = () => {
    const params = useGlobalSearchParams<{gambar: string}>();
    console.log("Gambar yang diterima", params);
    return (
        <View>
            <Image
                source={{uri: params.gambar}}
                style={{width: 200, height: 200}}
              
            />
        </View>
    );
};

export default Preview;