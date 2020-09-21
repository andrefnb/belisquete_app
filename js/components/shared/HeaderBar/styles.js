import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../colors';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');

const headBarHeight = 50;

export default StyleSheet.create({
    headerBar: {
        height: headBarHeight,
        width: '100%',
        backgroundColor: colors.lightgrey,
        alignItems: 'flex-end',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4, },
        shadowColor: colors.grey,
        shadowOpacity: 1.0
    },
    searchInput: {
        height: height * 0.05,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 7,
        backgroundColor: colors.white
    },
    headerBarWithSearch: {
        height: headBarHeight,
        width: '100%',
        backgroundColor: colors.lightgrey,
        alignItems: 'flex-end',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4, },
        shadowColor: colors.grey,
        shadowOpacity: 1.0,
        flexDirection:"row"
    },
    newButton: {
        width: width * 0.3,
        height: height * 0.05,
        marginRight: 10
    },
    newButtonWithMargin: {
        width: width * 0.3,
        height: height * 0.05,
        marginRight: 10,
        marginBottom: 7
    },
    // Picker
    picker: {
        borderRadius: 0,
        padding: 0
    },
    selectLabelTextStyle: {
        padding: 5,
        width: '99%',
        flexDirection: 'row',
        textAlign: 'left'
    }
});