// App.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/services/NotificationService';
import TabNavigator from './src/navigation/TabNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
    useEffect(() => {
        // Register device for push notifications on app load
        registerForPushNotificationsAsync();

        // Handle incoming notification while app is in foreground
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
        });

        // Clean up listener on component unmount
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <NavigationContainer>
            <TabNavigator />
            <Toast />
        </NavigationContainer>
    );
}
