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
    , db = new Datastore({ filename: 'clients' });
db.loadDatabase(function (err) {
    console.log("err", err)
});

class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            clientName: '',
            clientEstablishmentName: '',
            clientPhoneNumber: '',
            clientWhatsapp: '',
            clientEmail: '',
            clientAddress: '',
            clientCFP: '',
            clientCNPJ: '',
            clientCPF: '',
            clientIndex: '',

            nameError: '',
            establishmentNameError: '',
            emailError: '',
            addressError: '',
        };
    }

    static navigationOptions = {
        title: "Client"
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({
            clientName: navigation.getParam('name'),
            clientEstablishmentName: navigation.getParam('establishmentName'),
            clientPhoneNumber: navigation.getParam('phoneNumber'),
            clientWhatsapp: navigation.getParam('whatsapp'),
            clientEmail: navigation.getParam('email'),
            clientAddress: navigation.getParam('address'),
            clientCFP: navigation.getParam('CFP'),
            clientCNPJ: navigation.getParam('CNPJ'),
            clientCPF: navigation.getParam('CPF'),
            clientId: navigation.getParam('_id'),
            clientIndex: navigation.getParam('index')
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

    validateEmail(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let cer = reg.test(text);
        return cer;
    }

    validate() {
        const { navigation } = this.props;
        if (this.state.clientName) {
            if (this.state.clientEstablishmentName) {
                if (this.state.clientEmail) {
                    if (this.validateEmail(this.state.clientEmail)) {
                        if (this.state.clientAddress) {
                            if (navigation.getParam('_id')) {
                                this.editClient()
                            } else {
                                this.addClient()
                            }
                        } else {
                            this.setState({ addressError: Strings.errEmptyAddress })
                        }
                    } else {
                        this.setState({ emailError: Strings.errInvalidEmail })
                    }
                } else {
                    this.setState({ emailError: Strings.errEmptyEmail })
                }
            } else {
                this.setState({ establishmentNameError: Strings.errEmptyEstablishmentName })
            }
        } else {
            this.setState({ nameError: Strings.errEmptyName })
        }
    }

    editClient() {
        var doc = {
            _id: this.state.clientId,
            name: this.state.clientName,
            establishmentName: this.state.clientEstablishmentName,
            phoneNumber: this.state.clientPhoneNumber,
            whatsapp: this.state.clientWhatsapp,
            email: this.state.clientEmail,
            address: this.state.clientAddress,
            CFP: this.state.clientCFP,
            CNPJ: this.state.clientCNPJ,
            CPF: this.state.clientCPF
        }

        db.updateAsync({ _id: doc._id }, doc, (err, newDoc) => {
            this.edit(doc, this.state.clientIndex)
            this.navigateTo("Clients")
        })
    }

    addClient() {
        var doc = {
            name: this.state.clientName,
            establishmentName: this.state.clientEstablishmentName,
            phoneNumber: this.state.clientPhoneNumber,
            whatsapp: this.state.clientWhatsapp,
            email: this.state.clientEmail,
            address: this.state.clientAddress,
            CFP: this.state.clientCFP,
            CNPJ: this.state.clientCNPJ,
            CPF: this.state.clientCPF
        }

        db.insertAsync(doc, (err, newDoc) => {
            this.add(newDoc)
            this.navigateTo("Clients")
        });

    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={sharedStyles.container}>
                <KeyboardAwareScrollView bounces={false}>
                    <View style={sharedStyles.inputContainer}>
                        <CustomText style={sharedStyles.title} text={Strings.cliClient}/>

                        <TextField
                            style={sharedStyles.textField}
                            ref="name"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliNameLable}
                            error={this.state.nameError}
                            value={this.state.clientName}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientName", value)
                            }
                            placeholder={Strings.cliNameLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="establishmentName"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliEstablishmentNameLable}
                            error={this.state.establishmentNameError}
                            value={this.state.clientEstablishmentName}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientEstablishmentName", value)
                            }
                            placeholder={Strings.cliEstablishmentNameLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="phoneNumber"
                            // baseColor="orange"
                            keyboardType="phone-pad"
                            label={Strings.cliPhoneNumberLable}
                            // error={this.state.nameError}
                            value={this.state.clientPhoneNumber}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientPhoneNumber", value)
                            }
                            placeholder={Strings.cliPhoneNumberLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="whatsapp"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliWhatsappLable}
                            // error={this.state.nameError}
                            value={this.state.clientWhatsapp}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientWhatsapp", value)
                            }
                            placeholder={Strings.cliWhatsappLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="email"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliEmailLable}
                            error={this.state.emailError}
                            value={this.state.clientEmail}
                            errorColor="#D61F2B"
                            onChangeText={value => {
                                this.onChange("clientEmail", value);
                            }}
                            placeholder={Strings.cliEmailLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="address"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliAddressLable}
                            error={this.state.addressError}
                            value={this.state.clientAddress}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientAddress", value)
                            }
                            placeholder={Strings.cliAddressLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="CFP"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliCFPLable}
                            // error={this.state.nameError}
                            value={this.state.clientCFP}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientCFP", value)
                            }
                            placeholder={Strings.cliCFPLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="CNPJ"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliCNPJLable}
                            // error={this.state.nameError}
                            value={this.state.clientCNPJ}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientCNPJ", value)
                            }
                            placeholder={Strings.cliCNPJLable}
                        />

                        <TextField
                            style={sharedStyles.textField}
                            ref="CPF"
                            // baseColor="orange"
                            keyboardType="default"
                            label={Strings.cliCPFLable}
                            // error={this.state.nameError}
                            value={this.state.clientCPF}
                            errorColor="#D61F2B"
                            onChangeText={value =>
                                this.onChange("clientCPF", value)
                            }
                            placeholder={Strings.cliCPFLable}
                        />

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
export default Client;