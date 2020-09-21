import React, { Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { Provider } from 'react-redux';
import {
    persistCombineReducers,
    persistStore,
    persistReducer
} from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from './configureStore';

import AppWithNavigationState from './app';

const store = configureStore();
const persistor = persistStore(store);

export default class Setup extends Component {
    constructor() {
        super();

        Text.defaultProps.allowFontScaling = false;
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StatusBar backgroundColor="black" barStyle='light-content'/>
                    <AppWithNavigationState />
                </PersistGate>
            </Provider>
        );
    }
}
