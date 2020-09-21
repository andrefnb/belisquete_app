import {
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation'

import {
    Login,
    Home,
    Orders,
    Order,
    Items,
    Item,
    Clients,
    Client
} from '../main'

// To see warnings coment this line
console.disableYellowBox = true;

export const AppNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    Home: {
        screen: Home
    },
    Orders: {
        screen: Orders
    },
    Order: {
        screen: Order
    },
    Items: {
        screen: Items
    },
    Item: {
        screen: Item
    },
    Clients: {
        screen: Clients
    },
    Client: {
        screen: Client
    }
});