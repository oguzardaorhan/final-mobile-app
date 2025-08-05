import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import styles from '../styles/agreementStyles';
import { submitAgreement } from '../services/api';
import Toast from 'react-native-toast-message';

export default function AgreementScreen() {
    const [party1, setParty1] = useState('');
    const [party2, setParty2] = useState('');
    const [summary, setSummary] = useState('');
    const [condition1, setCondition1] = useState('');
    const [condition2, setCondition2] = useState('');
    const [signedBy, setSignedBy] = useState('');

    const handleSubmit = async () => {
        if (!party1 || !party2 || !summary || !condition1 || !condition2 || !signedBy) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please fill in all fields.',
                visibilityTime: 2500,
            });
            return;
        }

        try {
            const result = await submitAgreement({
                parties: [party1, party2],
                summary,
                conditions: [condition1, condition2],
                signedBy,
            });

            Toast.show({
                type: 'success',
                text1: 'Agreement Created!',
                text2: `ID: ${result.agreementId}`,
                visibilityTime: 3000,
            });

            setParty1('');
            setParty2('');
            setSummary('');
            setCondition1('');
            setCondition2('');
            setSignedBy('');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Submission Failed',
                text2: error.message || 'Failed to create agreement.',
                visibilityTime: 3000,
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
                        <Text style={styles.title}>Create Agreement</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Party 1"
                            value={party1}
                            onChangeText={setParty1}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Party 2"
                            value={party2}
                            onChangeText={setParty2}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.textarea}
                            placeholder="Summary"
                            multiline
                            numberOfLines={4}
                            value={summary}
                            onChangeText={setSummary}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Condition 1"
                            value={condition1}
                            onChangeText={setCondition1}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Condition 2"
                            value={condition2}
                            onChangeText={setCondition2}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Signed By (Mediator)"
                            value={signedBy}
                            onChangeText={setSignedBy}
                            placeholderTextColor="#888"
                        />

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit Agreement</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}
