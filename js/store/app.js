import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, Platform, StatusBar, Dimensions, NetInfo, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AppNavigator } from '../components/navigator';
import Strings from '../constants/strings';
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { setLanguage, setIsConnected } from '../actions';
import { connect } from 'react-redux';

class AppWithNavigationState extends Component {
    constructor(props) {
        super(props);

        this.screenProps = {
            // api: Api(props.dispatch, this.isConnected.bind(this), this.getLanguage.bind(this)),
        }
    }

    componentWillMount() {
        NetInfo.isConnected.fetch().done((reach) => {
            this.props.dispatch(setIsConnected(reach));

           NetInfo.isConnected.addEventListener("connectionChange", this.netListener.bind(this));
       });

        if(!this.props.language.value) {
            this.props.dispatch(setLanguage(Strings.getLanguage()))
        } else if(this.props.language.value != Strings.getLanguage()) {
            Strings.setLanguage(this.props.language.value);
        }
    }

    netListener(value) {
        this.props.dispatch(setIsConnected(value));
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        Strings.setLanguage('pt')
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        NetInfo.isConnected.removeEventListener("connectionChange", this.netListener.bind(this));
    }

    onBackPress = () => {
        const { dispatch, NavigationReducer } = this.props;
        if (NavigationReducer.index === 0) {
            try {
                if(NavigationReducer.routes[0].routes[1].index === 0){
                    return false;
                }
            } catch(error) {
                return false;
            }
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const { dispatch, NavigationReducer } = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <AppNavigator 
                    screenProps={this.screenProps}
                    // navigation={addNavigationHelpers({ dispatch, state: NavigationReducer })} 
                />
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => {
    return {
        NavigationReducer: state.NavigationReducer,
        language: state.language,
        isConnected: state.connected
    }
}

export default connect(mapStateToProps)(AppWithNavigationState);