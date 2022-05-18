import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity,ImageBackground } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY } from '../../../constants/index'
import { colors } from '../../../theme'




import translate from '../../../i18n/i18n'
import { LOGO, EMENU } from '../../../images'

const styles = StyleSheet.create({
    bg_round: {
        borderColor: colors.transparent,
        borderRadius: 10,
        borderWidth: 1,
        height: 150,



        // padding: DIMENS.px_10,
        backgroundColor: colors.primary
    },
})

export default (props) => (
    <View style={[styles.bg_round, { justifyContent: 'center' }]}>

        <View style={{ justifyContent: 'center', marginTop:30  }}>
            <Text style={{ color: colors.white, fontFamily: FONT_FAMILIY.Roboto_Bold, fontSize: DIMENS.txt_size_large_extra_20, alignSelf: 'center' }}>{"EUR " + props.amount}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
            <Text style={{ color: colors.white, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_1 }}>{translate('TODAY_EARNING ')}</Text>
            <Text style={{ color: colors.white, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_1 }}>{"(" +props.date+ ")"}</Text>

        </View>


        <ImageBackground
        source={EMENU}
        style={{ alignItems: 'center', marginHorizontal: 0 ,height: 40, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, marginTop:30, flex:1 }}>
            <TouchableOpacity
            style={{flex:1,height: 40, width:"100%" }}
                onPress={() => props.navigator.navigate('MyEarning')}>
                <Text style={{
                    color: colors.white,
                    fontFamily: FONT_FAMILIY.Roboto_Bold,
                    marginTop: 10, 
                    fontSize: DIMENS.txt_size_medium_1,
                    alignSelf:'center'
                }}>
                    {translate("VIEW")}
                </Text>
            </TouchableOpacity>

        </ImageBackground>

    </View>
)