import React from 'react';
import { View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import RegisterScreen from '../screens/RegisterScreen';
import CaseEntryScreen from '../screens/CaseEntryScreen';
import AgreementScreen from '../screens/AgreementScreen';
import EducationalResourcesScreen from '../screens/EducationalResourcesScreen';

import styles from '../styles/tabBarStyles';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            <BlurView intensity={80} tint="light" style={styles.blurBackground}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    let iconName;
                    switch (route.name) {
                        case 'Register': iconName = 'person-add'; break;
                        case 'Case Entry': iconName = 'document-attach'; break;
                        case 'Agreement': iconName = 'document-text'; break;
                        case 'Resources': iconName = 'book'; break;
                        default: iconName = 'ellipse';
                    }

                    const onPress = () => {
                        if (!isFocused) navigation.navigate(route.name);
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            onPress={onPress}
                            style={[styles.tabButton, isFocused && styles.activeTab]}
                            activeOpacity={0.8}
                        >
                            <Ionicons name={iconName} size={28} color={isFocused ? '#007AFF' : '#777'} />
                        </TouchableOpacity>
                    );
                })}
            </BlurView>
        </View>
    );
};

export default function TabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Register" component={RegisterScreen} />
            <Tab.Screen name="Case Entry" component={CaseEntryScreen} />
            <Tab.Screen name="Agreement" component={AgreementScreen} />
            <Tab.Screen name="Resources" component={EducationalResourcesScreen} />
        </Tab.Navigator>
    );
}
