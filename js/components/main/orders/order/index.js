import React, { Component } from 'react';
import Styles from './styles';
import Strings from '../../../../constants/strings';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    Picker,
    Image
} from 'react-native';
import CustomText from '../../../shared/customText';
import CustomButton from '../../../shared/CustomButton/customButton';
import sharedStyles from '../../../shared/sharedStyles';
import { renderCurrency } from '../../../shared/util';
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPic from 'rn-modal-picker'
import { connect } from 'react-redux';
import moment from 'moment';
import OrderModal from './orderModal';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const Datastore = require('react-native-local-mongodb')
    , db = new Datastore({ filename: 'orders' });
db.loadDatabase(function (err) {
    console.log("err", err)
});

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderNumber: '',
            totalprice: '',
            date: '',
            basket: [],
            items: [],
            client: '',
            showModal: false,
            itemIndex: '',
            errorMessage: '',
            selectedText: ''
        };
    }

    static navigationOptions = {
        title: "Order"
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.fetchData()
        this.add = navigation.getParam('add')
        this.edit = navigation.getParam('edit')
    }

    fetchData() {

        // Go get clients and items
        let dbItems = new Datastore({ filename: 'items' });
        dbItems.loadDatabase(function (err) {
            console.log("err", err)
        });
        dbItems.find({}, (err, items) => {
            this.setState({ items: items, db }, () => {

                let dbClients = new Datastore({ filename: 'clients' });
                dbClients.loadDatabase(function (err) {
                    console.log("err", err)
                });

                dbClients.find({}, (err, clients) => {
                    this.setState({ clients: clients, db }, () => {

                        const { navigation } = this.props;
                        if (navigation.getParam('_id')) {
                            // Edit
                            this.setState({
                                orderNumber: navigation.getParam('orderNumber'),
                                client: navigation.getParam('client')._id ? navigation.getParam('client')._id : navigation.getParam('client'),
                                selectedText: navigation.getParam('client').name,
                                date: navigation.getParam('date'),
                                basket: navigation.getParam('basket'),
                                itemIndex: navigation.getParam('index')
                            })
                        } else {
                            // Create
                            this.setState({ client: (clients.length > 0 ? clients[0]._id ? clients[0]._id : "" : ""), basket: [] })
                        }

                    })
                })

            })
        })

    }

    onChange(state, value) {
        this.setState({ [state]: value })
    }

    navigateTo(path) {
        this.props.navigation.navigate(path)
    }

    calculatePrice(basket) {

        let price = 0
        for (let basketItem of basket) {

            price += (basketItem.unitPrice * basketItem.quantity)

        }

        return price
    }

    getOrderNumber(numberOfOrders) {

        // Stringify number and add left 0s
        let numberString = String(numberOfOrders + 1)
        switch (numberString.length) {
            case 1: numberString = `000${numberString}`; break
            case 2: numberString = `00${numberString}`; break
            case 3: numberString = `0${numberString}`
        }

        // Add /year ex: 0001/19
        numberString = `${numberString}/${moment().format("YY")}`
        return numberString

    }

    async saveOrder() {
        let continueSave = true;
        if (!this.state.selectedText || this.state.selectedText == "") {
            continueSave = false
            this.setState({ errorMessage: Strings.errEmptyClient })
        }
        if (!this.state.basket || this.state.basket.length == 0) {
            continueSave = false
            this.setState({ errorMessage: Strings.errEmptyBasket })
        }
        if (continueSave) {
            const { navigation } = this.props;
            let totalPrice = this.calculatePrice(this.state.basket)
            var doc = {
                client: this.state.client,
                basket: this.state.basket,
                totalPrice: totalPrice,
                date: this.state.date
            }

            db.findAsync({ client: this.state.client }, (err, ordersForNumber) => {

                if (navigation.getParam('_id')) {
                    if (navigation.getParam('client')._id != this.state.client) {
                        doc.orderNumber = this.getOrderNumber(ordersForNumber.length)
                    } else {
                        doc.orderNumber = this.state.orderNumber
                    }

                    db.updateAsync({ _id: navigation.getParam('_id') }, doc, (err, newDoc) => {
                        doc._id = navigation.getParam('_id')
                        this.edit(doc, this.state.itemIndex)
                        this.navigateTo("Orders")
                    })


                } else {
                    doc.date = moment().format("DD-MM-YYYY HH:mm")

                    doc.orderNumber = this.getOrderNumber(ordersForNumber.length)

                    db.insertAsync(doc, (err, newDoc) => {
                        this.add(newDoc)
                        this.navigateTo("Orders")
                    });
                }
            })
        }

    }

    renderItem(rowData) {
        let quantityPer50 = `${Math.floor(Number(rowData.quantity / 50))}(50)`
        if (rowData.quantity % 50 != 0) {
            quantityPer50 += ` +${rowData.quantity % 50}`
        }

        return (<View style={Styles.itemContainerBasket}>
            {/* <Image
                // style={Styles.itemColumn}
                // source={rowData.image}
                source="./../../../../assets/salgadinho_1.jpeg"
                resizeMode="contain"
            /> */}
            <View style={Styles.itemColumnNumberBasket}><CustomText text={rowData.name} /></View>
            <View style={Styles.itemColumnNumberBasket}><CustomText text={rowData.quantity} /></View>
            <View style={Styles.itemColumnNumberBasket}><CustomText text={quantityPer50} /></View>
            <View style={Styles.itemColumnNumberBasket}><CustomText text={renderCurrency((rowData.unitPrice * rowData.quantity))} /></View>
        </View>)
    }

    addItems(basket) {
        this.setState({ showModal: false }, () => {
            // Add items to current basket
            let newItemsInBasket = this.state.basket
            for (var property in basket) {
                if (basket.hasOwnProperty(property)) {
                    let value = basket[property]

                    // Get item information in the items property
                    let itemInfo = this.state.items.find((item) => String(item._id) == String(property))

                    let desiredIndex = -1
                    this.state.basket.forEach((it, index) => {
                        if (it._id == property) desiredIndex = index
                    })

                    if (desiredIndex != -1) {
                        // Has to use already there price
                        newItemsInBasket[desiredIndex].quantity = value
                        if (value <= 0) {
                            newItemsInBasket.splice(desiredIndex, 1)
                        }
                    } else {
                        newItemsInBasket.push({
                            _id: property,
                            quantity: value,
                            name: itemInfo.name,
                            unitPrice: Number(itemInfo.unitPrice),
                            image: itemInfo.image
                        })
                    }


                }
            }

            this.setState({ basket: newItemsInBasket })
        })

    }

    // Picker
    _selectedValue(index, name) {
        let id = this.state.clients[index]._id
        this.setState({ selectedText: name, client: id });
    }

    render() {
        const { navigation } = this.props;
        let dataPicker = []
        if (this.state.clients) {
            dataPicker = this.state.clients.map((client, index) => {
                return { name: client.name, id: index }
            })
        }

        let isEdit = !!navigation.getParam('_id')

        return (
            <View style={sharedStyles.container}>
                <KeyboardAwareScrollView bounces={false}>
                    <View style={Styles.inputContainer}>
                        {
                            this.state.errorMessage != '' ?
                                <CustomText text={this.state.errorMessage} style={Styles.errorText} />
                                :
                                null
                        }
                        <CustomText style={sharedStyles.title} text={Strings.cliClient} />
                        {
                            this.state.clients ?
                                // <Picker
                                //     style={Styles.picker}
                                //     selectedValue={this.state.client}
                                //     onValueChange={(itemValue, itemIndex) => this.setState({ client: itemValue })}>
                                //     {
                                //         this.state.clients.map(client => {
                                //             return <Picker.Item label={client.name} value={client._id} />
                                //         })
                                //     }
                                // </Picker>
                                <RNPic
                                    dataSource={dataPicker}
                                    dummyDataSource={dataPicker}
                                    defaultValue={isEdit}
                                    disablePicker={false}
                                    changeAnimation={'slide'}
                                    // pickerTitle={"Country Picker"}
                                    showSearchBar={true}
                                    showPickerTitle={false}
                                    pickerStyle={sharedStyles.pickerStyle}
                                    selectedLabel={this.state.selectedText}
                                    placeHolderLabel={Strings.ordChooseClient}
                                    // selectLabelTextStyle={Styles.selectLabelTextStyle}
                                    placeHolderTextStyle={sharedStyles.placeHolderTextStyle}
                                    dropDownImageStyle={sharedStyles.dropDownImageStyle}
                                    // dropDownImage={require("./res/ic_drop_down.png")}
                                    selectedValue={(index, name) => this._selectedValue(index, name)}
                                />
                                : null
                        }

                    </View>

                    <CustomText style={sharedStyles.title} text={Strings.hoItems} />

                    <View style={Styles.itemsContainer} >

                        <CustomButton execute={() => { this.setState({ showModal: true }) }} text={Strings.ordAddItems} style={Styles.newItemsButton} />

                        <ListView
                            style={Styles.listView}
                            dataSource={this.state.basket ? ds.cloneWithRows(this.state.basket) : []}
                            renderRow={(rowData) => this.renderItem(rowData)}
                        />

                    </View>

                    <View style={sharedStyles.saveButtonContainer}>
                        <CustomButton execute={() => { this.saveOrder() }} text={Strings.utiConfirm} textStyle={sharedStyles.bigLetters} style={Styles.smallerButton} />
                    </View>

                </KeyboardAwareScrollView>
                <OrderModal basket={this.state.basket} items={this.state.items} addItems={(basket) => this.addItems(basket)} isVisible={this.state.showModal} close={() => this.setState({ showModal: false })} ></OrderModal>
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
export default Order;