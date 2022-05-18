import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY } from '../../../constants/index'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n'

const styles = StyleSheet.create({
    bg_round: {
        borderColor: colors.transparent,
        borderRadius: 5,
        borderWidth: 1,

        padding: DIMENS.px_10,
        backgroundColor: colors.white
    },
})

export default (props) => (
    <View
        activeOpacity={1}
        style={[styles.bg_round, {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            marginHorizontal: 20
        }]}>

        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={{ color: colors.primary, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium_1 }}>
                {translate('WEEK ') + props.week_number}
            </Text>
            <Text style={{ color: colors.textGrey, fontFamily: FONT_FAMILIY.Roboto_Regular, marginTop: 10, fontSize: DIMENS.txt_size_medium_1 }}>
                {props.start_date + ' - ' + props.end_date}
            </Text>

        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text style={{ color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_1 }}>
                {CURRENCY.RUPEES + props.amount.toFixed(2)}
            </Text>
            {/* <Text style={{ color: colors.green_dark, fontFamily: FONT_FAMILIY.Roboto_Regular, marginTop: 10, fontSize: DIMENS.txt_size_medium_1 }}>{translate("VIEW")}</Text> */}
        </View>
    </View>
)