'use strict';

function setLanguage(value) {
    return {
        type: 'SET_LANGUAGE',
        value: value
    };
}

module.exports = { setLanguage };