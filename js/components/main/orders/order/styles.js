import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from '../../../shared/colors';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    inputContainer: {
        // width: width * 0.8,
        width: width * 0.9,
        paddingTop: 20
    },
    inputContainerBasket: {
        width: '100%',
        padding: 10,
        flex: 1,
        flexDirection: 'column'
        // paddingTop: 0,
        // textAlignVertical: 'center'
    },
    newItemsButton: {
        width: width * 0.3,
        height: height * 0.05,
        marginRight: 10,
    },
    itemsContainer: {
        alignItems: 'flex-end',
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: colors.grey,
        shadowOpacity: 1.0,
    },
    itemContainerBasket: {
        backgroundColor: colors.secondary,
        borderRadius: 5,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        margin: 3,
        // marginRight: 20,
        height: height * 0.08,
        width: width * 0.9,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20
    },
    itemColumnNumberBasket: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Modal
    modalView: {
        flex: 1
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderRadius: 5
    },
    closeButton: {
        backgroundColor: colors.red,
        width: 55,
        height: 25,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        zIndex: 2,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderWidth: 0
    },
    addAnItem: {
        fontSize: 20,
        margin: 5
    },
    imageItem: {
        height: 65,//height * 0.1,
        width: 65,//height * 0.1,
        // borderTopLeftRadius: 100,
        // borderTopRightRadius: 100,
        // borderBottomLeftRadius: 100,
        // borderBottomRightRadius: 100,
        borderRadius: 65 / 2,
        // position: "absolute",
        // overflow: 'hidden',
        backgroundColor: colors.secondary
    },
    textField: {
        alignSelf: 'center',
    },
    textFieldNumber: {
        // alignSelf: 'center',
        backgroundColor: colors.white,
        alignItems: 'center'

        // marginTop: 0,

        // textAlignVertical: 'top',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start'
    },
    finishItemsContainer: {
        // width: width * 0.8,
        // paddingTop: 20,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rowItem: {
        flex: 2
    },

    smallerButton: {
        width: width * 0.4,
        height: height * 0.05,
        marginTop: 5
    },

    searchInput: {
        height: height * 0.05,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 7,
        backgroundColor: colors.lightgrey
    },
    errorText: {
        color: colors.red
    },

});