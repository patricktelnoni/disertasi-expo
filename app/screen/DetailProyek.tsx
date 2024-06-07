import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

const DetailProyek: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const params = useGlobalSearchParams<{id: string}>();
    const url    = 'https://jsonplaceholder.typicode.com/posts/'+params.id+'';
    console.log("Params", url);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>Detail Proyek</Text>
            <Text>Proyek Name: {data.title}</Text>
            <Text>Proyek Description: {data.body}</Text>
            {/* Render other details here */}
        </View>
    );
};

export default DetailProyek;