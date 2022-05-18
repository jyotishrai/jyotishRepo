import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY } from '../../../constants/index'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n'

const styles = StyleSheet.create({
    bg_round: {
        borderColor: colors.transparent,
        paddingHorizontal: DIMENS.px_5,
        paddingVertical: 10,
        backgroundColor: colors.white,
        minHeight: 50,
        borderWidth: 0,
        borderColor: 'red',
        flexDirection: 'row', 
         alignItems: 'center',
        justifyContent: 'space-between'
    },
})

export default (props) => (
    <View key={props.key} style={[styles.bg_round, { backgroundColor: props.bgColor != undefined ? props.bgColor : colors.white, }]}>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.couponCode}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.discountInPercentage}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'right', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.validFrom}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'right', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.validTo}</Text>
        <Text numberOfLines={1} style={{ marginHorizontal: 2, textAlign: 'right', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.status}</Text>
        {
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex: 2,
                    color: props.isTitle ? colors.black : colors.textGrey,
                    fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular,
                    fontSize: DIMENS.txt_size_small_12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    if (!props.isTitle) {
                        props.navigator.navigate('AddCoupon', { item: props.item })
                    }
                }}
            >
                <Text numberOfLines={1} style={{
                    color: props.isTitle ? colors.black : colors.textGrey,
                    fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular,
                    fontSize: DIMENS.txt_size_small_12,
                    textAlign: 'center'
                }}>{props.action}</Text>
            </TouchableOpacity>
        }
    </View>
)