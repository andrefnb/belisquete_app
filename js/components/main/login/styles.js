import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../../shared/colors';
import sharedStyles from '../../shared/sharedStyles';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white,
    },

    topImage: {
        width,
        height: height * 0.5
    },

    container: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        paddingTop: height * 0.5,
    },

    card: {
        width: width,
        height: height * 0.5,
        padding: 40,
        paddingTop: 60,
        paddingBottom: 60,
        // borderRadius: width * 0.035,
        backgroundColor: colors.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: width * 0.06,
        // paddingHorizontal: width * 0.06,
        ...Platform.select({
            android: {
                elevation: 10,
            }
        })
    },

    bigTitle: {
        color: colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: width * 0.06,
    },

    title: {
        fontSize: 20,
    },

    input: {
        width: '100%',
    },

    inputContainer: {
        marginTop: width * 0.02
    },
    credentialsContainer: {
        marginTop: 100,
    },
    button: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: width * 0.06,
        marginBottom: 60,
    },
});