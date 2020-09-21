import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../colors';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    button: {
        width: width * 0.5,
        height: height * 0.07,
        
        // old
        // backgroundColor: colors.primary,

        // new
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 3,

        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});