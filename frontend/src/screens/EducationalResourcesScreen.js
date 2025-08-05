import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import { fetchEducationalResources } from '../services/api';
import styles from '../styles/educationalStyles';

export default function EducationalResourcesScreen() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadResources = async () => {
            try {
                const data = await fetchEducationalResources();
                setResources(data);
            } catch (err) {
                setError('Failed to load resources.');
            } finally {
                setLoading(false);
            }
        };

        loadResources();
    }, []);

    const renderSection = (title, items) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
            ))}
        </View>
    );

    if (loading) {
        return (
            <ImageBackground
                source={require('../assets/istockphoto-665336594-612x612.jpg')}
                style={styles.background}
                blurRadius={3}
            >
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            </ImageBackground>
        );
    }

    if (error) {
        return (
            <ImageBackground
                source={require('../assets/istockphoto-665336594-612x612.jpg')}
                style={styles.background}
                blurRadius={3}
            >
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </ImageBackground>
        );
    }

    const articles = resources.filter(r => r.type === 'article');
    const videos = resources.filter(r => r.type === 'video');
    const workshops = resources.filter(r => r.type === 'workshop');

    return (
        <ImageBackground
            source={require('../assets/dark-red-blurred-background-vector.jpg')}
            style={styles.background}
            blurRadius={3}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.cardWrapper}>
                        {renderSection('Articles', articles)}
                        {renderSection('Videos', videos)}
                        {renderSection('Workshops', workshops)}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}
