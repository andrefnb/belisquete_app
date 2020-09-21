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
import { TextField } from "react-native-material-textfield";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from 'react-redux';

const Datastore = require('react-native-local-mongodb')
    , db = new Datastore({ filename: 'items' });
db.loadDatabase(function (err) {
    console.log("err", err)
});

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemId: '',
            itemName: '',
            itemUnitPrice: '',
            // itemQuantity: '',

            nameError: '',
            unitPriceError: '',
            // quantityError: ''
        };
    }

    static navigationOptions = {
        title: "Item"
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            itemName: navigation.getParam('name'),
            itemUnitPrice: navigation.getParam('unitPrice'),
            // itemQuantity: navigation.getParam('quantity'),
            itemId: navigation.getParam('_id'),
            itemIndex: navigation.getParam('index')
        })
        this.add = navigation.getParam('add')
        this.edit = navigation.getParam('edit')
    }

    onChange(state, value) {
        this.setState({ [state]: value })
    }

    navigateTo(path) {
        this.props.navigation.navigate(path)
    }

    validate() {
        const { navigation } = this.props;
        if (this.state.itemName) {
            if (this.state.itemUnitPrice && this.state.itemUnitPrice > 0) {
                // if (this.state.itemQuantity && this.state.itemQuantity > 0) {
                if (navigation.getParam('_id')) {
                    this.editItem()
                } else {
                    this.addItem()
                }
                // } else {
                //     this.setState({ quantityError: Strings.errEmptyQuantity })
                // }
            } else {
                this.setState({ unitPriceError: Strings.errEmptyUnitPrice })
            }
        } else {
            this.setState({ nameError: Strings.errEmptyName })
        }
    }

    editItem() {
        var doc = {
            _id: this.state.itemId,
            name: this.state.itemName,
            unitPrice: this.state.itemUnitPrice,
            // quantity: this.state.itemQuantity,
        }

        db.updateAsync({ _id: doc._id }, doc, (err, newDoc) => {
            this.edit(doc, this.state.itemIndex)
            this.navigateTo("Items")
        })
    }

    addItem() {
        var doc = {
            name: this.state.itemName,
            unitPrice: this.state.itemUnitPrice,
            // quantity: this.state.itemQuantity,
        }

        db.insertAsync(doc, (err, newDoc) => {
            this.add(newDoc)
            this.navigateTo("Items")
        });

    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={sharedStyles.container}>
                <KeyboardAwareScrollView bounces={false}>
                    <View style={sharedStyles.inputContainer}>
                        <CustomText style={sharedStyles.title} text={Strings.itmItem} />

                        <TextField
                            style={sharedStyles.textField}
                            ref="name"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.itmNameLable}
                            error={this.state.nameError}
                            value={this.state.itemName}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("itemName", value)
                            }
                            placeholder={Strings.itmNameLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="unitPrice"
                            // baseColor="orange"
                            keyboardType="numeric"
                            label={Strings.itmUnitPriceLable}
                            error={this.state.unitPriceError}
                            value={this.state.itemUnitPrice}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("itemUnitPrice", value)
                            }
                            placeholder={Strings.itmUnitPriceLable}
                        />

                        {/* <TextField
                            style={sharedStyles.textField}
                            ref="quantity"
                            // baseColor="orange"
                            keyboardType = "numeric"
                            label={Strings.itmQuantityLable}
                            error={this.state.quantityError}
                            value={this.state.itemQuantity}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("itemQuantity", value)
                            }
                            placeholder={Strings.itmQuantityLable}
                        /> */}


                    </View>

                    <View style={sharedStyles.saveButtonContainer}>
                        <CustomButton execute={() => { this.validate() }} text={Strings.utiConfirm} textStyle={sharedStyles.bigLetters} style={sharedStyles.smallerButton} />
                    </View>

                </KeyboardAwareScrollView>
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
export default Item;