import React from 'react';


import { Platform, StyleSheet, View, Button, Picker, Alert } from "react-native";
import FormTextInput from './FormTextInput';

import styles from './Auth/styles'
import translate from '../../src/i18n/i18n';
import {
    APP_PARAMS
} from '../constants'



const DropDown = (props) => {
    const { listData, onChange, selectedItem } = props
    //console.log('listData ::::::::::::::::::::::::::::::::::::::::::::', listData)
    //alert(JSON.stringify(listData))
    return (
        <Picker
            activeStyle={styles.textInputActive}
            component={FormTextInput}
            style={styles.textInput}
            selectedValue={selectedItem != undefined && selectedItem.label}
            onValueChange={(itemValue, itemIndex) => {
                onChange(itemValue, itemIndex)
            }
            }
            mode={"dropdown"}
        >
            {
                listData != undefined && listData.length > 0 ?
                    listData.map((item, index) => {

                        return <Picker.Item label={item.label != undefined ? item.label : ''} value={item.label != undefined ? item.label : ''} />
                    })
                    : <Picker.Item label={translate('No_Items')} value={translate('No_Items')} />

            }
        </Picker>
    )
}

export default DropDown
