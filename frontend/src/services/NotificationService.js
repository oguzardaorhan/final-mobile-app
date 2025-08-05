// src/services/notificationService.js

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from 'react-native';

// iOS foreground notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Register the device and get Expo Push Token
export const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
        Alert.alert('Push notifications require a physical device.');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push notification permissions.');
        return;
    }

    try {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        return tokenData.data;
    } catch (error) {
        console.error('Error getting push token:', error);
        return null;
    }
};

// Local push notification (manual title/body)
export const sendLocalNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
        },
        trigger: null,
    });
};

// Static test notification
export const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Case Submitted',
            body: 'Your case has been successfully received.',
        },
        trigger: null,
    });
};
