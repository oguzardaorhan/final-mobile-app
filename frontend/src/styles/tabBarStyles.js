import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    tabContainer: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 40,
        overflow: 'hidden',
        elevation: 15,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
    },
    blurBackground: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: Platform.OS === 'android' ? 'rgba(255,255,255,0.85)' : 'transparent',
    },
    tabButton: {
        padding: 14,
        borderRadius: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    activeTab: {
        backgroundColor: 'rgb(50,41,80)',
        borderRadius: 30,
        transform: [{ scale: 1.15 }],
    },
});
