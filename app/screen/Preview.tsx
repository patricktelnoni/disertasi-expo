import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';

const Preview = () => {
    const params = useLocalSearchParams<{gambar?: string}>();
    console.log("Gambar yang diterima", params);
    return (
        <View>
            <Image
                source={{uri: '${params.gambar}'}}
                style={{ width: 500, height: 500 }}
            />
        </View>
    );
};

export default Preview;