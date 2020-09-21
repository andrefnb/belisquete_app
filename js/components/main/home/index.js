import React, { Component } from 'react';
import Styles from './styles';
import Strings from '../../../constants/strings';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import CustomText from '../../shared/customText';
import CustomButton from '../../shared/CustomButton/customButton';
import sharedStyles from '../../shared/sharedStyles';
import { connect } from 'react-redux';

class Home extends Component {

    static navigationOptions = {
        title: "Home"
    }

    navigateTo(path) {
        this.props.navigation.navigate(path)
    }

    render() {

        return (
            <View style={Styles.container}>
                <ImageBackground
                    source={require('../../../assets/food-watermark.jpg')}
                    // resizeMode= "repeat"
                    style={[Styles.container, { height: '100%', width: '100%' }]}
                // imageStyle= {{ borderColor: 'black' }}
                >
                    <CustomButton execute={() => { this.navigateTo("Orders") }} text={Strings.hoOrders} textStyle={sharedStyles.bigLetters} style={Styles.button} />
                    <CustomButton execute={() => { this.navigateTo("Items") }} text={Strings.hoItems} textStyle={sharedStyles.bigLetters} style={Styles.button} />
                    <CustomButton execute={() => { this.navigateTo("Clients") }} text={Strings.hoClients} textStyle={sharedStyles.bigLetters} style={Styles.button} />
                    <View style={Styles.languageContainer}>
                        <CustomButton execute={() => { Strings.setLanguage('pt'); this.forceUpdate(); }} text='PT' style={Styles.buttonLanguage} />
                        <CustomButton execute={() => { Strings.setLanguage('en'); this.forceUpdate(); }} text='EN' style={Styles.buttonLanguage} />
                    </View>
                </ImageBackground>
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
export default Home;