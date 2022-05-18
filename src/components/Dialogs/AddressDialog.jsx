import React from 'react'
import {
    Text,
    View,
    TouchableOpacity, Modal
} from 'react-native'


import { colors } from '../../theme';
import { DIMENS, FONT_FAMILIY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';

export default class AddressDialog extends Basecomponents {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: true
        }
    }
    onClosePopover = () => {
        this.setState({ isVisible: false })
        this.props.onClosePopover()
    }
    continuePress = () => {
        this.onClosePopover()
        this.props.yesPopverPress()
    }

    render() {
        return (
            <Modal
                backgroundColor={colors.blackTransparent}
                animationType="slide"
                style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
                transparent={true}
                visible={this.state.isVisible}
                onDismiss={this.onClosePopover}
                onRequestClose={this.onClosePopover}
            //   onBackdropPress={this.onClosePopover}
            >
                <View style={{
                    backgroundColor: colors.white, borderRadius: DIMENS.px_3, paddingTop: DIMENS.px_25, width: '80%'
                }}>
                    <View style={{ paddingHorizontal: DIMENS.px_20 }}>
                        {
                            this.props.title != undefined &&
                            <Text style={{
                                textAlign: 'left', fontSize: DIMENS.txt_size_large, fontFamily: FONT_FAMILIY.Roboto_Medium,
                                color: colors.black,
                            }}>
                                {this.props.title}</Text>
                        }
                        {
                            this.props.subTitle != undefined &&
                            <Text style={{
                                textAlign: 'left', fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                color: colors.black, marginVertical: DIMENS.px_5
                            }}>
                                {this.props.subTitle}</Text>
                        }
                        {
                            this.props.mzg != undefined &&
                            <Text style={{
                                textAlign: 'left', fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                color: colors.grayClr
                            }}>
                                {this.props.mzg}</Text>
                        }
                    </View>
                    {
                        <View style={{
                            flexDirection: 'row', marginTop: DIMENS.px_20, alignItems: 'center',
                            borderTopColor: colors.lightGraytransparent, borderTopWidth: DIMENS.px_05,
                        }}>
                            <TouchableOpacity style={{
                                justifyContent: 'center', alignItems: 'center', borderRightColor: colors.lightGraytransparent
                                , borderRightWidth: DIMENS.px_05, flex: .5, paddingVertical: DIMENS.px_10
                            }}
                                onPress={() => this.onClosePopover()}>
                                <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {this.props.noTxts}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flex: .5, paddingVertical: DIMENS.px_10 }}
                                onPress={() => this.continuePress()}>
                                <Text style={{ color: colors.primary, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {this.props.continueTxt}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </Modal>
        )
    }
}

