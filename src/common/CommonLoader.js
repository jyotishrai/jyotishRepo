import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'

import { FONT_FAMILIY, DIMENS, CURRENCY } from '../constants/index'
import { colors } from '../theme'


// const styles = StyleSheet.create({
//     bg_round: {
//         borderColor: colors.transparent,
//         paddingHorizontal: 0,
//         paddingVertical: 0,
//         backgroundColor: colors.primary,
//         minHeight: 0,
//         borderWidth: 0,
//         borderColor: 'red',
//         flexDirection: 'row', alignItems: 'center',
//         justifyContent: 'space-between'
//     },
// })
export default ({ modalVisible }) => (
    //const CommonLoader = (props) => {

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
        }}
    >
        <View style={{ flex: 1, height: '100%', backgroundColor: colors.transparent_black, justifyContent: 'center' }}>
            <ActivityIndicator color={colors.white} size={40} />

        </View>
    </Modal>


)
//export default CommonLoader;