function setIsConnected(value) {
    return {
        type: 'SET_IS_CONNECTED',
        value: value
    };
}

module.exports = { setIsConnected };