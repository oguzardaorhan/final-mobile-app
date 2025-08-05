import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ImageBackground,
    useColorScheme,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/registerStyles';
import { submitRegistration } from '../services/api';
import * as Animatable from 'react-native-animatable';
import ConfettiCannon from 'react-native-confetti-cannon';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [caseDescription, setCaseDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // 📌 Gerekli izinleri iste
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Required', 'We need access to your photo library to upload a profile photo.');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets?.length > 0) {
                setPhoto(result.assets[0]);
            }
        } catch (error) {
            Alert.alert('Error', 'Could not open image picker.');
        }
    };

    const handleSubmit = async () => {
        if (!name || !contact || !address || !caseDescription) {
            Toast.show({
                type: 'error',
                text1: 'Please fill in all fields.',
                visibilityTime: 1500,
            });
            return;
        }

        try {
            await submitRegistration({
                name,
                contact,
                address,
                caseDescription,
                photo,
            });

            Toast.show({
                type: 'success',
                text1: 'Registration submitted successfully!',
                visibilityTime: 1500,
            });

            setShowConfetti(true);

            setName('');
            setContact('');
            setAddress('');
            setCaseDescription('');
            setPhoto(null);

            setTimeout(() => setShowConfetti(false), 3000);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Submission failed',
                text2: error.message || 'An error occurred.',
                visibilityTime: 2000,
            });
        }
    };

    return (
        <ImageBackground
            source={require('../assets/dark-red-blurred-background-vector.jpg')}
            style={styles.background}
            resizeMode="cover"
            blurRadius={3}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Animatable.View animation="fadeInUp" duration={800} style={[styles.card, isDark && styles.cardDark]}>
                    <Text style={[styles.title, isDark && styles.titleDark]}>Register</Text>

                    <TextInput
                        style={[styles.input, isDark && styles.inputDark]}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={isDark ? '#aaa' : '#999'}
                    />

                    <TextInput
                        style={[styles.input, isDark && styles.inputDark]}
                        placeholder="Contact Number"
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                        placeholderTextColor={isDark ? '#aaa' : '#999'}
                    />

                    <TextInput
                        style={[styles.input, isDark && styles.inputDark]}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        placeholderTextColor={isDark ? '#aaa' : '#999'}
                    />

                    <TextInput
                        style={[styles.input, styles.multilineInput, isDark && styles.inputDark]}
                        placeholder="Case Description"
                        value={caseDescription}
                        onChangeText={setCaseDescription}
                        multiline
                        numberOfLines={4}
                        placeholderTextColor={isDark ? '#aaa' : '#999'}
                    />

                    <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                        <Text style={styles.photoButtonText}>
                            {photo ? "Change Profile Photo" : "Upload Profile Photo"}
                        </Text>
                    </TouchableOpacity>

                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={styles.imagePreview}
                        />
                    )}

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ScrollView>
        </ImageBackground>
    );
}
