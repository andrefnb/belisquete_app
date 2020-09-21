import React, { Component } from 'react';
import Styles from './styles';
import {
    View
} from 'react-native';
import CustomButton from '../CustomButton/customButton'
import SearchInput, { createFilter } from 'react-native-search-filter';
import sharedStyles from '../sharedStyles';
import RNPic from 'rn-modal-picker'

class HeaderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedText: ''
        };
    }

    componentDidMount() {
        if (!!this.props.dropDownOptions && this.props.dropDownOptions.length > 0) {
            this.setState({ selectedText: this.props.dropDownOptions[0].name })
        }
    }

    navigateTo(path, params) {
        this.props.navigation.navigate(path, params)
    }

    _selectedValue(index, name) {
        this.props.changeSort(name)
        this.setState({ selectedText: name });
    }

    render() {
        let hasSearch = !!this.props.searchUpdated
        let hasDropDown = !!this.props.dropDownOptions
        return (
            <View style={hasSearch ? Styles.headerBarWithSearch : Styles.headerBar}>

                {
                    hasSearch ?
                        <View style={{ flex: 1 }}>

                            <SearchInput
                                onChangeText={(term) => { this.props.searchUpdated(term) }}
                                style={Styles.searchInput}
                                placeholder={this.props.searchString}
                            />

                        </View>
                        : null
                }
                {
                    hasDropDown ?
                    <View style={{ flex: 1 }}>

                        <RNPic
                            dataSource={this.props.dropDownOptions}
                            dummyDataSource={this.props.dropDownOptions}
                            defaultValue={true}
                            disablePicker={false}
                            changeAnimation={'slide'}
                            // pickerTitle={"Country Picker"}
                            // showSearchBar={true}
                            showPickerTitle={false}
                            pickerStyle={[sharedStyles.pickerStyle, Styles.searchInput, Styles.picker]}
                            selectedLabel={this.state.selectedText}
                            // placeHolderLabel={Strings.ordChooseClient}
                            selectLabelTextStyle={Styles.selectLabelTextStyle}
                            placeHolderTextStyle={sharedStyles.placeHolderTextStyle}
                            dropDownImageStyle={sharedStyles.dropDownImageStyle}
                            // dropDownImage={require("./res/ic_drop_down.png")}
                            selectedValue={(index, name) => this._selectedValue(index, name)}
                        />

                    </View>
                    : null
                }
                <CustomButton execute={() => { this.navigateTo(this.props.path, { add: this.props.addFunc }) }} text={this.props.stringToRender} style={hasSearch ? Styles.newButtonWithMargin : Styles.newButton} />
            </ View>
        );
    }
}

export default HeaderBar;