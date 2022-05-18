import React, { Component } from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY, DATE_FORMAT } from '../../../constants/index'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n'
import * as images from '../../../images'
import * as utils from '../../../utility/Utils';

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
    <View style={{
        marginHorizontal: 10,
        marginVertical: 10
    }}>
        <TouchableOpacity
            style={{
                height: DIMENS.px_40,
                backgroundColor: '#F05664',
                alignItems: 'center',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
            activeOpacity={0.5}
            onPress={() => props.handleClick(props.id)}
        >
            <Text style={{
                color: colors.white
            }} >
                {
                    props.title + ' (' + props.totalOrders + ')'
                }
            </Text>

            <Animated.Image
                style={{
                    tintColor: colors.white,
                    transform: [props.isActive ? { rotate: '180deg' } : { rotate: '0deg' }],
                }}
                source={images.DROP_DOWN}
            />
        </TouchableOpacity>

        {props.isActive == true && props.item != undefined && props.item.week_earning_days.map((item, index) => {
            return (
                <View style={[styles.bg_round, {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }]}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium_1 }}>
                            {item.product_name_list}
                        </Text>
                        <Text style={{ color: colors.textGrey, fontFamily: FONT_FAMILIY.Roboto_Regular, marginTop: 10, fontSize: DIMENS.txt_size_medium_1 }}>
                            {utils.getDateInUtc(item.createdAt, DATE_FORMAT.DATE_FORMAT_HH_mm__ss_SHOW)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_1 }}>
                            {CURRENCY.RUPEES + parseFloat(item.order_amount).toFixed(2)}
                        </Text>
                    </View>
                </View>
            )
        })
        }
    </View>
)