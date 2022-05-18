import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native'


import { colors } from '../../theme';
import { DIMENS, FONT_FAMILIY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';


export default class CommonMsgDialog extends Basecomponents {
    constructor(props) {
        super(props)

    }
    onClosePopover = () => {
        this.props.onClosePopover()
    }
    yesPress = () => {
        this.props.yesPopverPress()
    }

    render() {
        return (
            <Modal
                backgroundColor={colors.transparent}
                animationType="slide"
                transparent={true}
                visible={this.props.isVisible}
                onDismiss={this.onClosePopover}
                onRequestClose={this.onClosePopover}
            // onBackdropPress={this.onClosePopover}
            >
                <View
                    style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                        backgroundColor: colors.transparent_black
                    }}>
                    <View style={{
                        backgroundColor: colors.white, borderRadius: DIMENS.px_3, width: '80%',
                        padding: DIMENS.px_15,
                        justifyContent: 'center', alignItems: 'center', alignContent: 'center',

                    }}>
                        {
                            this.props.title != undefined &&
                            <Text style={{ textAlign: 'center', fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.primary }}>
                                {this.props.title}</Text>
                        }
                        {
                            this.props.mzg != undefined &&
                            <Text style={{ textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.primary }}>
                                {this.props.mzg}</Text>
                        }
                        {
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-evenly',
                                marginTop: DIMENS.px_20, marginHorizontal: DIMENS.px_10
                            }}>
                                <TouchableOpacity style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary,
                                    paddingVertical: DIMENS.px_5, borderRadius: DIMENS.px_3, flex: .45
                                }}
                                    onPress={this.yesPress}
                                >
                                    <Text style={{ color: colors.white, fontSize: DIMENS.txt_size_medium }}>
                                        {this.props.yesTxt}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary,
                                    paddingVertical: DIMENS.px_5, borderRadius: DIMENS.px_3, marginLeft: DIMENS.px_5, flex: .45
                                }}
                                    onPress={this.onClosePopover}>
                                    <Text style={{ color: colors.white, fontSize: DIMENS.txt_size_medium }}>
                                        {this.props.noTxts}</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </View>
            </Modal>
        )
    }
}

