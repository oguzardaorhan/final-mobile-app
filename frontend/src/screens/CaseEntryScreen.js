import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Switch,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import styles from '../styles/caseEntryStyles';
import { submitCaseEntry } from '../services/api';
import { sendLocalNotification } from '../services/NotificationService';
import Toast from 'react-native-toast-message';

export default function CaseEntryScreen() {
    const [proofFile, setProofFile] = useState(null);
    const [isInCourt, setIsInCourt] = useState(false);
    const [isInPolice, setIsInPolice] = useState(false);

    const pickProof = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
            multiple: false,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setProofFile({
                uri: asset.uri,
                name: asset.name || 'proof-file',
                mimeType: asset.mimeType || 'application/octet-stream',
            });
        } else {
            setProofFile(null);
        }
    };

    const handleSubmit = async () => {
        if (!proofFile || !proofFile.uri) {
            Toast.show({
                type: 'error',
                text1: 'Missing file',
                text2: 'Please upload a file before submitting.',
                visibilityTime: 2000,
            });
            return;
        }

        try {
            await submitCaseEntry({
                proofFile,
                isInCourt,
                isInPolice,
            });

            await sendLocalNotification(
                'Case Submitted',
                'Your case has been submitted successfully. Our team will review it shortly.'
            );

            Toast.show({
                type: 'success',
                text1: 'Case submitted successfully!',
                visibilityTime: 4000,
            });

            // Reset
            setProofFile(null);
            setIsInCourt(false);
            setIsInPolice(false);
        } catch (error) {
            console.error('Submission error:', error);
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
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Submit a Case</Text>

                        <TouchableOpacity style={styles.uploadButton} onPress={pickProof}>
                            <Text style={styles.uploadText}>
                                {proofFile ? `Selected: ${proofFile.name}` : 'Upload Proof File'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Already in Court?</Text>
                            <Switch
                                value={isInCourt}
                                onValueChange={setIsInCourt}
                                thumbColor={isInCourt ? '#007AFF' : '#f4f3f4'}
                                trackColor={{ false: '#ccc', true: '#aad8ff' }}
                            />
                        </View>

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Already with Police?</Text>
                            <Switch
                                value={isInPolice}
                                onValueChange={setIsInPolice}
                                thumbColor={isInPolice ? '#007AFF' : '#f4f3f4'}
                                trackColor={{ false: '#ccc', true: '#aad8ff' }}
                            />
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit Case</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}
