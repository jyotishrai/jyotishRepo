import React from 'react'
import { Image, TouchableOpacity, View, Text, Button, StyleSheet } from 'react-native'
import translate from '../i18n/i18n'
import { colors } from '../theme'
import { MENU, LOGO, NOTIFICATION } from '../images'

const menu_w = 36;
const menu_w_se = 24;
const menu_h = 36;
const logo_h = 50;
const noti_h = 35;
const noti_h_sub = 20;

export default ({ menuClick, title, imageSource, pageFlag, increasePageFlag, decreasePageFlag }) => (
    <View style={{
        backgroundColor: colors.transparent,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        height: 60,
    }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{
                width: menu_w, height: menu_h, borderRadius: menu_h, 
                justifyContent: 'center', alignItems: 'center'
            }} onPress={() => menuClick()} >
                <Image style={{ width: menu_w_se, height: menu_w_se, resizeMode: 'contain',  }} source={MENU}></Image>
            </TouchableOpacity>

            {title && <Text style={{ marginLeft: 10, fontWeight:'bold', color:'black' }}> {title}</Text>}

        </View>

        {!title && <Image style={{ resizeMode: 'center', width: logo_h, height: logo_h }} source={LOGO}></Image>}

        <View style={{ flexDirection: 'row' }}  >
            {pageFlag > 0 && pageFlag < 2 &&
                <View style={{ borderWidth: 1, borderColor: 'white', width: 70, marginRight: 10 }}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            if (pageFlag > 0) {
                                decreasePageFlag()
                            }
                        }}>
                        <Text style={{ color: colors.primary }}>
                            {
                                translate("SIGNUP_MY_PROFILE_PREVIOUS")
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {<View style={{ borderWidth: 1, borderColor: 'white', width: 70, marginRight: 10 }}>
                {pageFlag < 2 ?
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            increasePageFlag()
                        }}>
                        <Text style={{ color: colors.primary }}>
                            {
                                translate("SIGNUP_MY_PROFILE_NEXT")
                            }
                        </Text>
                    </TouchableOpacity>
                    : <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            decreasePageFlag()
                        }}>
                        <Text style={{ color: colors.primary }}>
                            {
                                translate("SIGNUP_MY_PROFILE_PREVIOUS")
                            }
                        </Text>
                    </TouchableOpacity>
                }
            </View>}
        </View>
    </View>
)

const styles = StyleSheet.create({
    buttonStyle: {
        borderColor: colors.primary,
        borderWidth: 1.2,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6
    }
});