import React, { Component } from 'react';
import Styles from './styles';
import {
    TouchableOpacity
} from 'react-native';
import CustomText from '../customText';

class CustomButton extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <TouchableOpacity style={[Styles.button, this.props.style]} onPress={() => this.props.execute()}>
                <CustomText style={this.props.textStyle} text={this.props.text} />
            </TouchableOpacity>
        );
    }
}

export default CustomButton;
