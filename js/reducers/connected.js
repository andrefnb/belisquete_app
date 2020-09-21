function setIsConnected(state = { value: true }, action) {
    if (action.type === 'SET_IS_CONNECTED') {
        return {
            value: action.value
        };
    }

    return state;
}

module.exports = setIsConnected;