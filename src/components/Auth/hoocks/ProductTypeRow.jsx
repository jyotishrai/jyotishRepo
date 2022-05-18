import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY, DATE_FORMAT } from '../../../constants/index'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n'

import * as utils from '../../../utility/Utils';

const styles = StyleSheet.create({
    bg_round: {
        borderColor: colors.transparent,
        paddingHorizontal: DIMENS.px_10,
        paddingVertical: 10,
        backgroundColor: colors.white,
        minHeight: 50,
        borderWidth: 0,
        borderColor: 'red',
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between'
    },
})


export default (props) => (
    <View key={props.key} style={[styles.bg_round, { backgroundColor: props.bgColor != undefined ? props.bgColor : colors.white, }]}>
        <Text numberOfLines={1} style={{ textAlign: 'left', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.name}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.discription}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.status}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
            {props.isTitle ? props.created : utils.convertStrDateFormat(props.created, DATE_FORMAT.DATE_FORMAT_DD_MMM_SHOW)}
        </Text>
        {/* <Text numberOfLines={1} style={{ textAlign: 'right', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.action}</Text> */}
        {
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex: 1,
                    color: props.isTitle ? colors.black : colors.textGrey,
                    fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular,
                    fontSize: DIMENS.txt_size_small_12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    if (!props.isTitle) {
                        props.navigator.navigate('AddProductType', { item: props.item })
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