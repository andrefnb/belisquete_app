import React, { Component } from 'react';
import Styles from './styles';
import Strings from '../../../../constants/strings'; import Modal from "react-native-modal";
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
import SearchInput, { createFilter } from 'react-native-search-filter';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const KEYS_TO_FILTERS = ['name', 'unitPrice'];

class OrderModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basket: {},
            search: ''
        };
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // this.props.basket is the basket already added
        // this.state.basket is the basket that is to alter

        if (nextProps.isVisible && !this.props.isVisible) {

            if (this.props.basket.length > 0) {
                let bask = {}
                for (let item of this.props.basket) {
                    bask[item._id] = item.quantity
                }
                this.setState({ basket: bask })
            }


        }

    }

    onChange(_id, value) {
        let newBasket = this.state.basket
        newBasket[_id] = Number(value)
        this.setState({ basket: newBasket })
    }

    finishAddItems() {
        this.props.addItems(this.state.basket)
        this.setState({ basket: [] })
    }

    searchUpdated(term) {
        this.setState({ search: term })
    }

    renderItem(rowData) {
        let value = String(this.state.basket[rowData._id] ? this.state.basket[rowData._id] : '')
        // const img = require(rowData.image);
        // var imgs = [
        //     "./../../../../assets/salgadinho_1.jpeg",
        //     "./../../../../assets/salgadinho_2.jpg",
        //     "./../../../../assets/salgadinho_3.jpg"
        // ]
        // let actImg = imgs[index]
        // alert(actImg)
        // alert(index)
        return <View style={sharedStyles.itemContainer}>
            {/* <Image
                style={Styles.imageItem}
                source={require("./../../../../assets/salgadinho_1.jpeg")}
                resizeMode="contain"
            /> */}
            <View style={sharedStyles.itemColumnNumber}><CustomText text={rowData.name} /></View>
            <View style={sharedStyles.itemColumnNumber}><CustomText text={renderCurrency(rowData.unitPrice)} /></View>
            {/* <View style={sharedStyles.itemColumnNumber}><Text style={Styles.itemNumber}>{rowData.quantity}</Text></View> */}
            <View style={[sharedStyles.itemColumnNumber, Styles.rowItem]}>
                <View style={Styles.inputContainerBasket}>
                    <TextField
                        style={Styles.textFieldNumber}
                        ref={"basket" + rowData._id}
                        // baseColor="orange"
                        keyboardType="numeric"
                        // label={Strings.ordQuantity}
                        // error={this.state.nameError}
                        value={value}
                        // defaultValue={this.state.basket[rowData._id] ? this.state.basket[rowData._id] : 0}
                        // errorColor="#D61F2B"
                        onChangeText={value =>
                            this.onChange(rowData._id, value)
                        }
                        placeholder={Strings.ordQuantity}
                        labelHeight={0}
                    />
                </View>
            </View>
        </View>
    }

    render() {
        const filteredItems = this.props.items.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
        return (
            <View>
                <Modal isVisible={this.props.isVisible} style={Styles.modalContainer} onBackButtonPress={this.props.close}>
                    <View style={Styles.modalView}>
                        <CustomButton execute={this.props.close} text={Strings.genClose} style={Styles.closeButton} />

                        <CustomText style={Styles.addAnItem} text={Strings.ordAddItems} />

                        <SearchInput
                            onChangeText={(term) => { this.searchUpdated(term) }}
                            style={Styles.searchInput}
                            placeholder={Strings.utiSearch}
                        />

                        <ListView
                            style={Styles.listView}
                            dataSource={filteredItems ? ds.cloneWithRows(filteredItems) : []}
                            renderRow={(rowData) => this.renderItem(rowData)}
                        />

                        <View style={Styles.finishItemsContainer}>
                            <CustomButton execute={() => this.finishAddItems()} text={Strings.ordAddItems} style={Styles.smallerButton} />
                        </View>

                    </View>
                </Modal>
            </View>
        );
    }
}

export default OrderModal;