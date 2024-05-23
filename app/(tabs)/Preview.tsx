import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';

const Preview = () => {
    const params = useLocalSearchParams<{image?: string}>();
    console.log("Gambar yang diterima", params.image);
    return (
        <View>
            <Image
                source={{uri: params.image}}
                style={{ width: 300, height: 300 }}
            />
        </View>
    );
};

export default Preview;