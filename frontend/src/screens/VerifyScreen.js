import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import styles from '../styles/verifyStyles';
import { submitCaseVerification } from '../services/api';

const VerifyScreen = () => {
    const [type, setType] = useState('');
    const [caseNumber, setCaseNumber] = useState('');

    const handleSubmit = async () => {
        if (!type || !caseNumber) {
            Alert.alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await submitCaseVerification({ type, caseNumber });

            if (response.valid) {
                Alert.alert('✅ Case Verified', response.message);
            } else {
                Alert.alert('❌ Verification Failed', response.message);
            }
        } catch (error) {
            Alert.alert('Verification Error', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Case Verification</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Case Type (e.g. Court or Police)"
                    placeholderTextColor="#999"
                    value={type}
                    onChangeText={setType}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Case Number"
                    placeholderTextColor="#999"
                    value={caseNumber}
                    onChangeText={setCaseNumber}
                    keyboardType="default"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default VerifyScreen;
