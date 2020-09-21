import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../../shared/colors';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 10,
    },

    buttonLanguage: {
        width: width * 0.23
    },

    languageContainer: {
        width: width * 0.5,
        flexDirection: 'row',
        height : height * 0.07,
        justifyContent: 'space-between',
    },
});