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
import { renderCurrency } from '../../shared/util';
import { connect } from 'react-redux';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import SearchInput, { createFilter } from 'react-native-search-filter';
import HeaderBar from '../../shared/HeaderBar/headerBar';

const Datastore = require('react-native-local-mongodb')

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const KEYS_TO_FILTERS = ['name', 'unitPrice'];

class Items extends Component {

    static navigationOptions = {
        title: "Items"
    }

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            db: {},
            dialogVisible: false,
            toDeleteRowId: '',
            toDelete: '',
            search: ''
        };
        this.addItem = this.addItem.bind(this)
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        let db = new Datastore({ filename: 'items' });
        db.loadDatabase(function (err) {
            console.log("err", err)
        });

        let items = db.findAsync({}, (err, docs) => {

            this.setState({ items: docs, db })

        })

    }

    navigateTo(path, params) {
        this.props.navigation.navigate(path, params)
    }

    deleteItem(rowDataId, rowID) {
        // Delete action
        let indexToDelete = -1;
        this.state.items.find((el, i) => {
            if (el._id == rowDataId) {
                indexToDelete = i;
            }
        })
        this.state.db.removeAsync({ _id: rowDataId }, () => {
            let newItems = JSON.parse(JSON.stringify(this.state.items))
            newItems.splice(indexToDelete, 1)
            this.setState({ items: newItems, dialogVisible: false, toDeleteRowId: '', toDelete: '' })
        })
    }

    edit(doc, index) {
        let items = this.state.items
        let newItems = JSON.parse(JSON.stringify(items))
        newItems[index] = doc
        this.setState({ items: newItems })
    }

    editItem(rowData, rowID) {
        // Edit action
        let itemObj = rowData
        let indexToDelete = -1;
        this.state.items.find((el, i) => {
            if (el._id == rowData._id) {
                indexToDelete = i;
            }
        })
        itemObj.index = indexToDelete
        itemObj.edit = this.edit.bind(this)
        this.navigateTo("Item", itemObj)
    }

    addItem(newDoc) {
        let items = this.state.items
        let newItems = JSON.parse(JSON.stringify(items))
        newItems.push(newDoc)
        this.setState({ items: newItems })
    }

    renderItem(rowData, rowID) {
        return <View style={sharedStyles.wholeContainer}>
            <View style={sharedStyles.itemContainer}>
                {/* <Image
                style={Styles.itemColumn}
                source={rowData.}
                resizeMode="contain"
            /> */}
                <View style={[sharedStyles.itemColumnNumber, sharedStyles.listItems]}>
                    <View style={sharedStyles.listItemUnit}>
                        <CustomText text={rowData._id} style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} />
                        <CustomText text={rowData.name} style={sharedStyles.defaultListItem} />
                    </View>
                </View>
                <View style={[sharedStyles.itemColumnNumber, sharedStyles.listItems]}><CustomText text={renderCurrency(rowData.unitPrice)} style={sharedStyles.defaultListItem} /></View>
                <View style={sharedStyles.itemColumnNumber}>
                    <CustomButton execute={() => { this.editItem(rowData, rowID) }} text={Strings.utiEdit} style={sharedStyles.editButton} textStyle={sharedStyles.defaultListItem} />
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
        const filteredItems = this.state.items.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
        return (
            <View style={sharedStyles.container}>
                <HeaderBar navigation={this.props.navigation} addFunc={this.addItem} stringToRender={Strings.itmNewItem} path={'Item'} searchUpdated={this.searchUpdated} searchString={Strings.utiSearch} />
                <View style={sharedStyles.listViewContainer}>
                    <ListView
                        style={sharedStyles.listView}
                        dataSource={filteredItems ? ds.cloneWithRows(filteredItems) : []}
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
                        onPress: () => this.deleteItem(this.state.toDelete, this.state.toDeleteRowId)
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
export default Items;