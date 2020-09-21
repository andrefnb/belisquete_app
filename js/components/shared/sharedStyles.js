import { Dimensions, Platform, StyleSheet } from 'react-native';
import colors from './colors';
import { Header } from 'react-navigation';
import { StatusBar } from 'react-native';

// Access to height and width of the phone
const { height, width } = Dimensions.get('window');
const navBarHeight = Header.HEIGHT;
const statusBarHeight = StatusBar.currentHeight;
const headBarHeight = 50;

export default StyleSheet.create({
    // Misc
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // ...Platform.select({
        //     ios: {
        //         backgroundColor: 'red'
        //     },
        //     android: {
        //         backgroundColor: 'blue'
        //     }
        // })
    },

    // Listing page
    defaultListItem: {
        fontWeight: 'bold'
    },
    listViewContainer: {
        padding: 10,
        width: '100%',
        height: (height - headBarHeight - navBarHeight - statusBarHeight)
    },
    itemContainer: {
        backgroundColor: colors.secondary,
        borderRadius: 5,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        margin: 0,
        height: height * 0.08,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20
    },
    itemColumnNumber: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItems: {
        flex: 2
    },
    deleteButton: {
        backgroundColor: colors.eliminate,
    },
    editButton: {
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: 0,
        backgroundColor: colors.primary,
        borderWidth: 0
    },
    wholeContainer: {
        margin: 3
    },

    // New page
    inputContainer: {
        width: width * 0.8,
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    textField: {
        alignSelf: 'center',
    },
    title: {
        fontSize: 20
    },
    bigLetters: {
        fontSize: 15
    },
    smallLetter: {
        fontSize: 9
    },
    smallerButton: {
        width: width * 0.4,
        height: height * 0.05
    },

    listItemUnit: {
        flex: 1,
        justifyContent: 'space-evenly'
    },

    toEnd: {
        alignItems: 'flex-end'
    },

    saveButtonContainer: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },


    // Picker
    placeHolderTextStyle: {
        color: colors.grey,
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row"
    },
    dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center"
    },
    pickerStyle: {
        paddingLeft: 5,
        paddingRight: 5,
        shadowRadius: 1,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 1,
            height: 1
        },
        borderColor: colors.darkgrey,
        shadowColor: colors.darkgrey,
        borderRadius: 5,
        elevation: 1,
        flexDirection: "row",
        backgroundColor: colors.white
    }

});