import React, { Component } from 'react';
import {
    Text
} from 'react-native';

let styles = {
    fontSize: 12
}

class CustomText extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Text style={[styles, this.props.style]}>{this.props.text}</Text>
        );
    }
}

export default CustomText;