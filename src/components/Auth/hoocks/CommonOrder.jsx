import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY, DATE_FORMAT } from '../../../constants/index'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n'
import * as utils from '../../../utility/Utils';
import CustomMenuIcon from '../../CustomMenuIcon'

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
        <Text numberOfLines={1} style={{ textAlign: 'left', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.phone}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
            {props.isTitle ? props.price : CURRENCY.RUPEES + parseFloat(props.price).toFixed(2)}
        </Text>
        {/* <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.orderId}</Text> */}
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>{props.orderNo}</Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 2, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
            {props.isTitle ? props.create : utils.convertStrDateFormat(props.create)}
        </Text>
        <Text numberOfLines={1} style={{ textAlign: 'center', flex: 1, color: props.isTitle ? colors.black : colors.textGrey, fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
            {props.isTitle ? props.status : utils.convertOrderStatus(props.status)}
        </Text>
        {props.isTitle ? <Text numberOfLines={1} style={{
            textAlign: 'center',
            flex: 1,
            height: props.isTitle ? 16 : '100%',
            alignSelf: 'center',
            color: props.isTitle ? colors.black : colors.textGrey,
            fontFamily: props.isTitle ? FONT_FAMILIY.Roboto_Bold : FONT_FAMILIY.Roboto_Regular,
            fontSize: props.isTitle ? DIMENS.txt_size_small_12 : DIMENS.txt_size_min_small,
        }}>
            {props.action}
        </Text> : props.customMenuItems != undefined ?
                <CustomMenuIcon
                    menutext="Menu"
                    menustyle={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    textStyle={{
                        color: 'white',
                    }}
                    customMenuItems={props.customMenuItems}
                    onMenuItemClick={props.onMenuItemClick}
                    rowItem={props.rowItem}
                /> :
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => props.navigator.navigate('AddCoupon')}
                >
                    <Image
                        style={{ justifyContent: "center", }}
                        source={require('../../../assets/images/eye.png')}
                    />
                </TouchableOpacity>}
    </View>
)

