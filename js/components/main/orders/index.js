import React, { Component } from 'react';
import Styles from './styles';
import Strings from '../../../constants/strings';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import CustomText from '../../shared/customText';
import CustomButton from '../../shared/CustomButton/customButton';
import sharedStyles from '../../shared/sharedStyles';
import { renderCurrency } from '../../shared/util';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { TextField } from "react-native-material-textfield";
import SearchInput, { createFilter } from 'react-native-search-filter';
import HeaderBar from '../../shared/HeaderBar/headerBar';
import moment from 'moment'

const Datastore = require('react-native-local-mongodb');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const KEYS_TO_FILTERS = ['client.name', 'date', 'totalPrice'];

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            clients: [],
            db: {},
            dialogVisible: false,
            dialogVisibleExport: false,
            toDeleteRowId: '',
            toDelete: '',
            search: '',
            selectedText: '',
            fallDownChosen: -1
        };
        this.addOrder = this.addOrder.bind(this)
        this.searchUpdated = this.searchUpdated.bind(this)
        this.changeSort = this.changeSort.bind(this)
        this.changeFall = this.changeFall.bind(this)
    }

    static navigationOptions = {
        title: "Orders"
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.fetchData()
        this.setState({ selectedText: Strings.genDate })
    }

    fetchData() {
        console.log("fetchData")
        let dbClients = new Datastore({ filename: 'clients' });
        dbClients.loadDatabase(function (err) {
            console.log("err", err)
        });

        dbClients.findAsync({}, (err, clients) => {

            this.setState({ clients: clients }, () => {

                let db = new Datastore({ filename: 'orders' });
                db.loadDatabase(function (err) {
                    console.log("err", err)
                });

                let orders = db.findAsync({}, (err, docs) => {
                    this.setState({ orders: docs, db }, () => console.log("end fetchData"))

                })

            })

        })


    }

    navigateTo(path, params) {
        this.props.navigation.navigate(path, params)
    }

    deleteOrder(rowDataId, rowID) {
        // Delete action
        this.state.db.removeAsync({ _id: rowDataId }, () => {
            let newOrders = JSON.parse(JSON.stringify(this.state.orders))
            let indexToDelete = -1;
            this.state.orders.find((el, i) => {
                if (el._id == rowDataId) {
                    indexToDelete = i;
                }
            })
            newOrders.splice(indexToDelete, 1)
            this.setState({ orders: newOrders, dialogVisible: false, toDeleteRowId: '', toDelete: '' })
        })
    }

    edit(doc, index) {
        let orders = this.state.orders
        let newOrders = JSON.parse(JSON.stringify(orders))
        newOrders[index] = doc
        this.setState({ orders: newOrders })
    }

    editOrder(rowData, rowID) {
        // Edit action
        let orderObj = rowData
        let indexToDelete = -1;
        this.state.orders.find((el, i) => {
            if (el._id == rowData._id) {
                indexToDelete = i;
            }
        })
        orderObj.index = indexToDelete
        orderObj.edit = this.edit.bind(this)
        this.navigateTo("Order", orderObj)
    }

    addOrder(newDoc) {
        let orders = this.state.orders
        let newOrders = JSON.parse(JSON.stringify(orders))
        newOrders.push(newDoc)
        this.setState({ orders: newOrders })
    }

    _selectedValue(index, name) {
        let id = this.state.clients[index]._id
        this.setState({ selectedText: name });
    }

    changeFall(rowID) {
        console.log("changeFall")
        let ind = rowID;
        console.log("1", Number(this.state.fallDownChosen))
        console.log("2", Number(rowID))
        if (Number(this.state.fallDownChosen) == Number(rowID)) {
            ind = -1
        }
        console.log("ind", ind)
        this.setState({ fallDownChosen: ind })
    }


    renderItem(rowData, rowID) {
        console.log("renderItem")
        console.log("this.state", this.state)
        console.log("rowData", rowData)
        console.log("rowID", rowID)
        console.log("this.state.fallDownChosen == rowID", this.state.fallDownChosen == rowID)
        let isChosenToFall = !!(this.state.fallDownChosen == rowID)
        return (
            <View style={isChosenToFall ? [sharedStyles.wholeContainer, Styles.wholeContainer] : [sharedStyles.wholeContainer]}>
                <TouchableOpacity onPress={() => this.changeFall(rowID)}>
                    <View style={[sharedStyles.itemContainer]} >

                        {/* <Image
                style={Styles.itemColumn}
                source={rowData.}
                resizeMode="contain"
            /> */}
                        <View style={[sharedStyles.itemColumnNumber, sharedStyles.listItems]}>
                            <View style={sharedStyles.listItemUnit}>
                                <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} text={rowData._id} />
                                {
                                    rowData.client ?
                                        <CustomText style={sharedStyles.defaultListItem} text={`${rowData.client.name} (${rowData.orderNumber})`} />
                                        :
                                        <CustomText style={sharedStyles.defaultListItem} text={'-'} />
                                }
                            </View>
                        </View>

                        <View style={[sharedStyles.itemColumnNumber, sharedStyles.listItems]}>
                            <View style={sharedStyles.listItemUnit}>
                                <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter]} text={rowData.date} />
                                <View style={sharedStyles.toEnd}>
                                    <CustomText style={sharedStyles.defaultListItem} text={renderCurrency(rowData.totalPrice)} />
                                </View>
                            </View>
                        </View>

                        <View style={[sharedStyles.itemColumnNumber]}>
                            <CustomButton execute={() => { this.editOrder(rowData, rowID) }} text={Strings.utiEdit} style={[sharedStyles.editButton]} textStyle={sharedStyles.defaultListItem} />
                        </View>
                        <View style={[sharedStyles.itemColumnNumber]}>
                            <CustomButton execute={() => { this.setState({ dialogVisible: true, toDelete: rowData._id, toDeleteRowId: rowID }) }} text={Strings.genDelete} style={[sharedStyles.editButton, sharedStyles.deleteButton]} textStyle={sharedStyles.defaultListItem} />
                        </View>


                    </View>
                </TouchableOpacity>
                {
                    isChosenToFall ?
                        <View style={Styles.fallDown}>
                            <View style={Styles.fallDownItems}>
                                <View style={[Styles.fallDownItemRow, Styles.fallDownItemRowHeader]}>
                                    <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={Strings.genNameLable} />
                                    <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={Strings.genQuantityLable} />
                                    <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={''} />
                                    <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={Strings.genUnitPriceLable} />
                                </View>
                                {
                                    rowData.basket.map(el => {
                                        let quantityPer50 = `${Math.floor(Number(el.quantity / 50))}(50)`
                                        if (el.quantity % 50 != 0) {
                                            quantityPer50 += ` +${el.quantity % 50}`
                                        }

                                        return <View style={Styles.fallDownItemRow}>
                                            <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={el.name} />
                                            <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={el.quantity} />
                                            <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={quantityPer50} />
                                            <CustomText style={[sharedStyles.defaultListItem, sharedStyles.smallLetter, Styles.fallDownLetters]} text={el.unitPrice} />
                                        </View>

                                    })
                                }
                            </View>

                        </View>
                        : null
                }

            </View >
        )
    }

    searchUpdated(term) {
        this.setState({ search: term })
    }

    changeSort(name) {
        this.setState({ selectedText: name })
    }

    render() {
        console.log("RENDER")

        const dropDownOptions = [Strings.genDate, Strings.genHighest, Strings.genLowest]

        console.log("this.state", this.state)

        let ordersClientsPopulated = this.state.orders.map(order => {
            let newOrder = JSON.parse(JSON.stringify(order))
            newOrder.client = this.state.clients.find((cli) => String(cli._id) == String(order.client))
            return newOrder
        })

        let dropDownOptionsComp = dropDownOptions.map((el, i) => { return { name: el, id: i } })

        // Filter orders
        const filteredOrders = ordersClientsPopulated.filter(createFilter(this.state.search, KEYS_TO_FILTERS))

        // Sort orders
        let sortedOrders = []
        switch (this.state.selectedText) {
            case Strings.genDate:
                sortedOrders = filteredOrders.sort((a, b) => {
                    let momentA = moment(a.date, 'DD-MM-YYYY HH:mm')
                    let momentB = moment(b.date, 'DD-MM-YYYY HH:mm')
                    if (momentA.isBefore(momentB)) {
                        return -1;
                    }
                    if (momentB.isBefore(momentA)) {
                        return 1;
                    }
                    return 0;
                }); break;
            case Strings.genHighest:
                sortedOrders = filteredOrders.sort((a, b) => {
                    return b.totalPrice - a.totalPrice;
                }); break;
            case Strings.genLowest:
                sortedOrders = filteredOrders.sort((a, b) => {
                    return a.totalPrice - b.totalPrice;
                }); break;
        }

        return (
            <View style={sharedStyles.container} >
                <HeaderBar navigation={this.props.navigation}
                    addFunc={this.addOrder}
                    stringToRender={Strings.ordNewOrder}
                    path={'Order'}
                    searchUpdated={this.searchUpdated}
                    searchString={Strings.utiSearch}
                    dropDownOptions={dropDownOptionsComp}
                    changeSort={this.changeSort} />
                <View style={sharedStyles.listViewContainer}>
                    <ListView
                        style={sharedStyles.listView}
                        dataSource={sortedOrders ? ds.cloneWithRows(sortedOrders) : []}
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
                        onPress: () => this.deleteOrder(this.state.toDelete, this.state.toDeleteRowId)
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
export default Orders;