import { combineReducers } from 'redux';
import {
    persistReducer
} from "redux-persist";
import storage from "redux-persist/es/storage";

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../components/navigator';

const initialAction = { type: NavigationActions.Init }
const initialState = AppNavigator.router.getStateForAction(initialAction);

const loggedIn = (state) => AppNavigator.router.getStateForAction(
    NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' }) // Home é a primeira janela que irá ser renderizada ao abrir a app, caso haja login feito 
        ]
    }), state
);

const loggedOut = (state) => AppNavigator.router.getStateForAction(
    NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: 'Login' }) // Login é a primeira janela que irá ser renderizada caso não login feito ou caso haja logout
        ]
    }), state
);

function NavigationReducer(state = initialState, action = initialAction) {
    // let isLoggedIn =  !!action && action.key == 'token' && !!action.payload && !!action.payload.value;

    // // User is logged in => navigates to home screen
    // if(isLoggedIn) return loggedIn(state);

    // // Token is set to null (logged out) => navigates to login screen
    // if(!!action && action.type == 'SET_TOKEN' && !action.value) return loggedOut(state);

    try {
        if (!!action && !!action.type && action.type.includes('Navigation')) {
            global.current = action.routeName;
        }
    } catch(e) {};

    return AppNavigator.router.getStateForAction(action, state);
}

const config = key => ({ key, storage });

export default combineReducers({
    NavigationReducer,
    connected: require('./connected'),
    language: persistReducer(config('language'), require('./language')),
});