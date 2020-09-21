import React, { Component } from 'react';
import Styles from './styles';
import Strings from '../../../constants/strings';
import {
    Text,
    View,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import CustomText from '../../shared/customText';
import CustomButton from '../../shared/CustomButton/customButton';
import sharedStyles from '../../shared/sharedStyles';
import { connect } from 'react-redux';
import { TextField } from "react-native-material-textfield";

class Login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",

            emailError: "",
            passwordError: ""
        };
    }

    onChange(state, value) {
        this.setState({ [state]: value })
    }

    checkCredentials() {
        // if (this.state.email == "Belisquete") {
        //     if (this.state.password == "1234") {
                this.navigateTo()
        //     } else {
        //         this.setState({ passwordError: Strings.errPassword })
        //     }
        // } else {
        //     this.setState({ emailError: Strings.errEmail })
        // }
    }

    navigateTo() {
        this.props.navigation.navigate("Home")
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={Styles.root}>
                    <Image source={require('../../../assets/salgadinho_1.jpeg')} style={Styles.topImage} resizeMethod='resize' resizeMode='cover' />
                    <View style={Styles.container}>
                                {/* <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false}> */}
                            <View style={Styles.card}>
                                {/* <CustomText style={Styles.bigTitle} text={Strings.logLogin} /> */}
                                {/* <TextField
                                    ref="email"
                                    style={Styles.input}
                                    inputContainerStyle={Styles.inputContainer}
                                    label={Strings.logEmail}
                                    error={this.state.emailError}
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    errorColor="#D61F2B"
                                    onChangeText={value => this.onChange("email", value)}
                                /> */}
                                <TextField
                                    ref="password"
                                    style={Styles.input}
                                    // inputStyle={{placeholderTextColor: 'black'}}
                                    // inputContainerStyle={Styles.inputContainer}
                                    label={Strings.logPassword}
                                    error={this.state.passwordError}
                                    value={this.state.password}
                                    keyboardType="default"
                                    errorColor="#D61F2B"
                                    onChangeText={value => this.onChange("password", value)}
                                />

                                <CustomButton execute={() => this.checkCredentials()} text={Strings.logLogin} textStyle={Styles.title} style={Styles.button} />
                            </View>
                                {/* </KeyboardAwareScrollView> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );

        // return (
        //     <View style={Styles.container}>

        //         <KeyboardAwareScrollView bounces={false}>
        //             <View style={Styles.credentialsContainer}>
        //                 <TextField
        //                     style={Styles.email}
        //                     ref="email"
        //                     label={Strings.logEmail}
        //                     error={this.state.emailError}
        //                     value={this.state.email}
        //                     keyboardType="email-address"
        //                     errorColor="#D61F2B"
        //                     onChangeText={value =>
        //                         this.onChange("email", value)
        //                     }
        //                     placeholder={Strings.logEmailPlaceholder}
        //                 />

        //                 <TextField
        //                     ref="password"
        //                     label={Strings.logPassword}
        //                     error={this.state.passwordError}
        //                     value={this.state.password}
        //                     keyboardType="default"
        //                     errorColor="#D61F2B"
        //                     onChangeText={value =>
        //                         this.onChange("password", value)
        //                     }
        //                     placeholder="******"
        //                 />
        //             </View>


        //             <TouchableOpacity style={Styles.button} onPress={() => { this.checkCredentials() }}>
        //                 <Text>{Strings.logLogin}</Text>
        //             </TouchableOpacity>
        //         </KeyboardAwareScrollView>
        //     </View>
        // );
    }
}

function select(store) {
    return {
        isConnected: store.connected,
        language: store.language
    };
}

export default connect(select)(Login);
// export default Login;