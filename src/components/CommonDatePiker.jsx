

import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import FormTextInput from './FormTextInput'

import translate from '../i18n/i18n';

import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from './Auth/styles';
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../theme";

export default class CommonTimePiker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            showDate: this.props.date != undefined ? this.props.date : '',

        };
        if (this.props.date != undefined) {
            this.props.onDateChange(this.props.date)
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
        // this.props.onClick(this.state.showDate)
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        //console.log("A date has been picked: ", new Date(date).getHours());
        this.setState({
            showDate: moment(date).format('YYYY-MM-DD')
        })
        this.hideDateTimePicker();
        this.props.onDateChange(moment(date).format('YYYY-MM-DD'))
        // (moment(date).format('DD MMM YYYY'))
    };

    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', height: 50, backgroundColor: 'white', opacity: 100 }}
                    onPress={this.showDateTimePicker}>
                    <Text style={{
                        fontSize: 16, padding: 8,
                        color: colors.textGrey
                    }} >{this.props.date} </Text>
                </TouchableOpacity>

                {/* <Label> {this.state.showDate == '' ? translate('OPENING_TIME') : null}</Label> */}


                <DateTimePicker
                    mode='date'
                    minimumDate={new Date()}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        );
    }
}