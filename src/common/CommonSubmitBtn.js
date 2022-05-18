import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY } from '../constants/index'
import { colors } from '../theme'


const styles = StyleSheet.create({
    bg_round: {
        borderColor: colors.transparent,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: colors.primary,
        minHeight: 0,
        // width:'90%',
        borderWidth: 0,
        borderColor: 'red',
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between'
    },
})


export default (props) => (

    <TouchableOpacity
        disabled={props.submitDisabled}
        onPress={props.handleSubmit}
        style={props.submitStyles}>

        {props.loading ? (
            <ActivityIndicator color={colors.white} size={20} />
        ) : (
                <Text style={props.submitBtnText}>{props.title}</Text>
            )}

    </TouchableOpacity>

)