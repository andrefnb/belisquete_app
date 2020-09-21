import Strings from '../constants/strings';

function setLanguage(state = { value: Strings.getLanguage() }, action) {
    if (action.type === 'SET_LANGUAGE') {
        return {
            value: action.value
        };
    }

    return state;
}

module.exports = setLanguage;