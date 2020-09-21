import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../../shared/colors';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');

const headBarHeight = 50;

export default StyleSheet.create({

    listItemSmaller: {

        fontSize: 12

    },

    wholeContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 20,
    },

    fallDown: {
        padding: 3
    },

    fallDownItems: {
        flex: 1
    },

    fallDownItemRow: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 5,
        padding: 1,
    },

    fallDownItemRowHeader: {
        borderColor: colors.grey
    },

    fallDownLetters: {
        flex: 1,
        textAlign: 'right',
        color: colors.grey,
        fontSize: 10,
        borderBottomWidth:1,
        borderColor: colors.lightgrey
    }

});