

import React, { Component } from "react";
import { Button, View, Text, Dimensions } from "react-native";
import FormTextInput from './FormTextInput'
import styles from '../components/Auth/styles'
import translate from '../i18n/i18n';

import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";

const WIDTH = Dimensions.get("screen").width

export default class CommonTimePiker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            showTime: undefined,
        };
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
        // this.props.onClick(this.state.showTime)
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        //  console.log("A date has been picked: ", new Date(date).getHours());
        this.setState({
            showTime: moment(date).format('h:mm a')
        })
        this.hideDateTimePicker();
        this.props.onClick(moment(date).format('h:mm a'))
    };

    render() {
        return (
            <View style={styles.textInput}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    height: 30,
                    borderRadius: 4,
                    backgroundColor: 'white',
                }}>
                    <Text onPress={this.showDateTimePicker}
                        style={{
                            fontSize: 16,
                            // fontWeight: 'bold',
                        }}>
                        {this.state.showTime != undefined ? this.state.showTime : this.props.time}
                    </Text>
                </View>
                <DateTimePicker
                    mode='time'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        );
    }
}