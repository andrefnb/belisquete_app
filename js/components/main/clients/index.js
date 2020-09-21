import React, { Component } from 'react';
import Styles from './styles';
import Strings from '../../../constants/strings';
import {
    Text,
    View,
    TouchableOpacity,
    ListView
} from 'react-native';
import CustomText from '../../shared/customText';
import CustomButton from '../../shared/CustomButton/customButton';
import sharedStyles from '../../shared/sharedStyles';
import { connect } from 'react-redux';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import SearchInput, { createFilter } from 'react-native-search-filter';
import HeaderBar from '../../shared/HeaderBar/headerBar';

const Datastore = require('react-native-local-mongodb')

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const KEYS_TO_FILTERS = ['name', 'establishmentName', 'email', 'address', 'phoneNumber', 'whatsapp'];

class Clients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            db: {},
            dialogVisible: false,
            toDeleteRowId: '',
            toDelete: '',
            search: ''
        };
        this.addClient = this.addClient.bind(this)
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    static navigationOptions = {
        title: "Clients"
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        let db = new Datastore({ filename: 'clients' });
        db.loadDatabase(function (err) {
            console.log("err", err)
        });

        let clients = db.findAsync({}, (err, docs) => {

            this.setState({ clients: docs, db })

        })

    }

    navigateTo(path, params) {
        this.props.navigation.navigate(path, params)
    }

    deleteClient(rowDataId, rowID) {
        // Delete action
        let indexToDelete = -1;
        this.state.clients.find((el, i) => {
            if (el._id == rowDataId) {
                indexToDelete = i;
            }
        })
        this.state.db.removeAsync({ _id: rowDataId }, () => {
            let newClients = JSON.parse(JSON.stringify(this.state.clients))
            newClients.splice(indexToDelete, 1)
            this.setState({ clients: newClients, dialogVisible: false, toDeleteRowId: '', toDelete: '' })
        })
    }

    editClient(rowData, rowID) {
        // Edit action
        let clientObj = rowData
        let indexToDelete = -1;
        this.state.clients.find((el, i) => {
            if (el._id == rowData._id) {
                indexToDelete = i;
            }
        })
        clientObj.index = indexToDelete
        clientObj.edit = this.edit.bind(this)
        this.navigateTo("Client", clientObj)
    }

    edit(doc, index) {
        let clients = this.state.clients
        let newClients = JSON.parse(JSON.stringify(clients))
        newClients[index] = doc
        this.setState({ clients: newClients })
    }

    addClient(newDoc) {
        let clients = this.state.clients
        let newClients = JSON.parse(JSON.stringify(clients))
        newClients.push(newDoc)
        this.setState({ clients: newClients })
    }

    renderItem(rowData, rowID) {
        return <View style={sharedStyles.wholeContainer}>
            <View style={sharedStyles.itemContainer}>
                {/* <Image
                style={sharedStyles.itemColumn}
                source={rowData.}
                resizeMode="contain"
            /> */}
                <View style={[sharedStyles.itemColumnNumber, sharedStyles.listItems]}>
                    <View style={sharedStyles.listItemUnit}>
                        <CustomText text={rowData._id} style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} />
                        <CustomText text={rowData.name} style={sharedStyles.defaultListItem} />
                    </View>
                </View>
                <View style={[sharedStyles.itemColumnNumber, sharedStyles.listItems]}>
                    <View style={sharedStyles.listItemUnit}>
                        <CustomText text={rowData.email} style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} />
                        <CustomText text={rowData.phoneNumber} style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} />
                        <CustomText text={rowData.establishmentName} style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} />
                    </View>
                </View>
                <View style={sharedStyles.itemColumnNumber}>
                    <CustomButton execute={() => { this.editClient(rowData, rowID) }} text={Strings.utiEdit} style={[sharedStyles.editButton]} textStyle={sharedStyles.defaultListItem} />
                </View>
                <View style={sharedStyles.itemColumnNumber}>
                    <CustomButton execute={() => { this.setState({ dialogVisible: true, toDelete: rowData._id, toDeleteRowId: rowID }) }} text={Strings.genDelete} style={[sharedStyles.editButton, sharedStyles.deleteButton]} textStyle={sharedStyles.defaultListItem} />
                </View>
            </View>
        </View>
    }

    searchUpdated(term) {
        this.setState({ search: term })
    }

    render() {
        const filteredClients = this.state.clients.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
        return (
            <View style={sharedStyles.container}>
                <HeaderBar navigation={this.props.navigation} addFunc={this.addClient} stringToRender={Strings.cliNewClient} path={'Client'} searchUpdated={this.searchUpdated} searchString={Strings.utiSearch} />
                <View style={sharedStyles.listViewContainer}>
                    <ListView
                        style={sharedStyles.listView}
                        dataSource={filteredClients ? ds.cloneWithRows(filteredClients) : []}
                        renderRow={(rowData, sectionID, rowID) => this.renderItem(rowData, rowID)}
                    />
                </View>

                <ConfirmDialog
                    title={Strings.utiConfirmTitle}
                    message={Strings.utiConfirmMessage}
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                    positiveButton={{
                        title: Strings.utiYes,
                        onPress: () => this.deleteClient(this.state.toDelete, this.state.toDeleteRowId)
                    }}
                    negativeButton={{
                        title: Strings.utiNo,
                        onPress: () => this.setState({ dialogVisible: false })
                    }}
                />
            </View>
        );
    }
}

function select(store) {
    return {
        isConnected: store.connected,
        language: store.language
    };
}

// export default connect(select)(Home);
export default Clients;