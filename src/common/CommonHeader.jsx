import React from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'

import { colors } from '../theme'
import { MENU, LOGO, NOTIFICATION } from '../images'

const menu_w = 36;
const menu_w_se = 24;
const menu_h = 36;
const logo_h = 50;
const noti_h = 35;
const noti_h_sub = 20;


export default ({ menuClick, title, imageSource }) => (
  
  <View style={{
    backgroundColor: colors.lightGray,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    height: 60
  }}>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={{
        width: menu_w, height: menu_h, borderRadius: menu_h, 
        justifyContent: 'center', alignItems: 'center'
      }} onPress={() => menuClick()} >
        <Image style={{ width: menu_w_se, height: menu_w_se, resizeMode: 'contain', }} source={MENU}></Image>
      </TouchableOpacity>

      {title && <Text style={{ marginLeft: 10, fontWeight:'bold', color:colors.black }}> {title.toUpperCase()}</Text>}

    </View>

    {!title && <Image style={{ resizeMode: 'center', width: logo_h, height: logo_h }} source={LOGO}></Image>}

    {/* <TouchableOpacity style={{
      // width: noti_h, height: noti_h, borderRadius: noti_h, 
      justifyContent: 'center', alignItems: 'center', marginRight:5
    }}>
      <Image style={{}} source={NOTIFICATION}></Image>
    </TouchableOpacity> */}

  </View>
)