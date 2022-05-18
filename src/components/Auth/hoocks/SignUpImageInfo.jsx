import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import FormTextInput from '../../FormTextInput'
import styles from '../styles'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n';

import CommonImagePiker from '../../CommonImagePiker'
import { DIMENS, APP_PARAMS } from '../../../constants'
import CustomImagePicker from '../../CommonImagePiker';
import { FlatList } from 'react-native-gesture-handler';

const Label = ({ children, style, key }) => (
    <Text numberOfLines={1} style={[styles.label, style,]}>
        {children}
    </Text>
)

const input_field_radius = 5;
export default renderForm = (formProps, thisProps) => {
    const [selectedImageKey, setSelectedImageKey] = useState(undefined);
    const { invalid, pristine, submitError, allState } = formProps
    // console.log('fromProps:::::::::::::::::::::::::', formProps);
    const { loading } = thisProps
    const submitDisabled = pristine || invalid

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding' })}
            style={[styles.topView]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                style={[styles.scrollView, { maginVertical: 0 }]}
            >
                <Text style={{
                    color: colors.black, fontSize: 16, marginVertical: 10
                }}>
                    {
                        translate('UPLOAD_DOCUMENT')
                    }
                </Text>

                <View style={[
                    styles.formControlView,
                    {
                        paddingBottom: 0,
                        flexDirection: "row"
                    }
                ]}>
                    <Label>
                        {
                            translate('SHOP_LICENCE_IMAGE')
                        }
                    </Label>

                    {
                        allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE] != undefined &&
                        allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE].length > 0 &&
                        <TouchableOpacity
                            onPress={() => {
                            }}
                        >
                            <Label style={{
                                marginLeft: 15,
                                color: colors.green_dark
                            }}>
                                {
                                    translate('VIEW_IMAGE')
                                }
                            </Label>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{
                    flexDirection: "row",
                    height: 50,
                    marginLeft: 16,
                    marginRight: 16,
                }}>
                    <View style={{
                        height: 50,
                        flex: 1
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                justifyContent: "center",
                                padding: 5,
                                borderRadius: input_field_radius
                            }}
                            onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.SHOP_LICENCE_IMAGE, showKeyName: APP_PARAMS.SHOP_LICENCE_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}>
                            <Label style={{ paddingHorizontal: 5, paddingBottom: 0, }}>
                                {
                                    allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE] != undefined &&
                                        allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE][0] ?
                                        allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE][0].name :
                                        translate('SHOP_LICENCE_IMAGE_HINT')
                                }
                            </Label>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        {
                            allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE_SHOW] != undefined &&
                                allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE_SHOW][0] != undefined ?
                                <Image
                                    style={{
                                        height: DIMENS.reg_img_h,
                                        width: DIMENS.reg_img_w,
                                        borderRadius: DIMENS.reg_img_rad,
                                        backgroundColor: 'black'
                                    }}
                                    source={{ uri: allState.state[APP_PARAMS.SHOP_LICENCE_IMAGE_SHOW][0] }}
                                /> :
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: DIMENS.reg_img_h,
                                        width: DIMENS.reg_img_w,
                                        borderRadius: DIMENS.reg_img_rad,
                                        backgroundColor: colors.transparent_black
                                    }}>
                                    <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>
                                        {
                                            translate('ADD_NEW_IMAGE')
                                        }
                                    </Label>
                                </View>
                        }
                    </View>
                </View>

                <View style={[
                    styles.formControlView,
                    { marginTop: DIMENS.reg_inp_space, paddingBottom: 0, flexDirection: "row" }
                ]}>
                    <Label>
                        {
                            translate('FSSAI_LICENCE_IMAGE')
                        }
                    </Label>
                    {allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE] != undefined &&
                        allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE].length > 0 &&
                        <TouchableOpacity
                            onPress={() => {
                            }}>
                            <Label style={{ marginLeft: 15, color: colors.green_dark }}>
                                {
                                    translate('VIEW_IMAGE')
                                }
                            </Label>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: "row", height: 50, marginLeft: 16, marginRight: 16, }}>
                    <View style={{ height: 50, flex: 1 }} >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                justifyContent: "center",
                                padding: 5,
                                borderRadius: input_field_radius
                            }}
                            onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.FSSAI_LICENCE_IMAGE, showKeyName: APP_PARAMS.FSSAI_LICENCE_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}
                        >
                            <Label style={{ paddingHorizontal: 5, paddingBottom: 0, }}>
                                {
                                    allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE] != undefined &&
                                        allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE][0] ?
                                        allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE][0].name :
                                        translate('FSSAI_LICENCE_IMAGE_HINT')
                                }
                            </Label>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        {allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE_SHOW] != undefined && allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE_SHOW][0] != undefined ? <Image
                            style={{ height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: 'black' }}
                            source={{ uri: allState.state[APP_PARAMS.FSSAI_LICENCE_IMAGE_SHOW][0] }}
                        /> :
                            <View
                                style={{ justifyContent: 'center', alignItems: 'center', height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: colors.transparent_black }}>
                                <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>{translate('ADD_NEW_IMAGE')}</Label>
                            </View>
                        }
                    </View>
                </View>

                <View style={[styles.formControlView, { marginTop: DIMENS.reg_inp_space, paddingBottom: 0, flexDirection: "row" }]}>
                    <Label>{translate('GSTN_IMAGE')}</Label>
                    {allState.state[APP_PARAMS.GSTN_IMAGE] != undefined && allState.state[APP_PARAMS.GSTN_IMAGE].length > 0 &&
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Label style={{ marginLeft: 15, color: colors.green_dark }}>{translate('VIEW_IMAGE')}</Label>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: "row", height: 50, marginLeft: 16, marginRight: 16, }}>
                    <View style={{ height: 50, flex: 1 }} >
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: 'white', justifyContent: "center", padding: 5, borderRadius: input_field_radius }}
                            onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.GSTN_IMAGE, showKeyName: APP_PARAMS.GSTN_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}
                        >
                            <Label style={{ paddingHorizontal: 5, paddingBottom: 0, }}
                            >
                                {allState.state[APP_PARAMS.GSTN_IMAGE] != undefined && allState.state[APP_PARAMS.GSTN_IMAGE][0] ? allState.state[APP_PARAMS.GSTN_IMAGE][0].name : translate('GSTN_IMAGE_HINT')}
                            </Label>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        {allState.state[APP_PARAMS.GSTN_IMAGE_SHOW] != undefined && allState.state[APP_PARAMS.GSTN_IMAGE_SHOW][0] != undefined ? <Image
                            style={{ height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: 'black' }}
                            source={{ uri: allState.state[APP_PARAMS.GSTN_IMAGE_SHOW][0] }}
                        /> :
                            <View
                                style={{ justifyContent: 'center', alignItems: 'center', height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: colors.transparent_black }}>
                                <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>{translate('ADD_NEW_IMAGE')}</Label>
                            </View>
                        }
                    </View>
                </View>

                <View style={[styles.formControlView, { paddingBottom: 0, flexDirection: "row" }]}>

                    <Label style={{ marginTop: 10, }}>{translate('KITCHEN_IMAGE')}</Label>

                    <TouchableOpacity onPress={() => {
                        setSelectedImageKey({ key: APP_PARAMS.KITCHEN_IMAGE, showKeyName: APP_PARAMS.KITCHEN_IMAGE_SHOW })
                        formProps.visiblaeChange(true)
                    }}>
                        <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('ADD_IMAGE')}</Label>
                    </TouchableOpacity>

                    {allState.state[APP_PARAMS.KITCHEN_IMAGE] != undefined && allState.state[APP_PARAMS.KITCHEN_IMAGE].length > 0 &&
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('VIEW_ALL')}</Label>
                        </TouchableOpacity>
                    }

                    {allState.state[APP_PARAMS.KITCHEN_IMAGE] != undefined && allState.state[APP_PARAMS.KITCHEN_IMAGE].length > 0 &&
                        <TouchableOpacity onPress={() => {
                            formProps.editHandle(APP_PARAMS.KITCHEN_IMAGE_EDIT)
                        }}>
                            <Label style={{ marginTop: 10, marginLeft: 15, color: allState.state[APP_PARAMS.KITCHEN_IMAGE_EDIT] ? colors.red : colors.green_dark }}>{translate('EDIT')}</Label>
                        </TouchableOpacity>
                    }

                </View>
                <View style={{ flexDirection: "row", height: 50, marginLeft: 16, marginRight: 16, }}>

                    <View style={{ height: 50, flex: 1, }} >

                        {allState.state[APP_PARAMS.KITCHEN_IMAGE] != undefined && allState.state[APP_PARAMS.KITCHEN_IMAGE].length > 0 ? (
                            <FlatList
                                data={allState.state[APP_PARAMS.KITCHEN_IMAGE_SHOW]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={({ id }) => id}
                                renderItem={({ item }) => {
                                    return (<View style={{ marginRight: 10, }}>
                                        <Image
                                            style={{ height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: 'black' }}
                                            source={item != undefined ? { uri: item } : require('../../../assets/images/video.png')}
                                        />
                                        {allState.state[APP_PARAMS.KITCHEN_IMAGE_EDIT] && <TouchableOpacity onPress={() => alert('delete')} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 5, right: 5, width: 20, height: 20, backgroundColor: colors.red, borderRadius: 10 }}>
                                            <Image style={{ tintColor: colors.white, width: 18, height: 18 }} source={require('../../../assets/images/cross.png')}></Image>
                                        </TouchableOpacity>}
                                    </View>)
                                }}

                            />) : (<TouchableOpacity onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.KITCHEN_IMAGE, showKeyName: APP_PARAMS.KITCHEN_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: colors.transparent_black }}>
                                    <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>{translate('ADD_NEW_IMAGE')}</Label>
                                </View></TouchableOpacity>)
                        }
                    </View>
                </View>
                <View style={[styles.formControlView, { paddingBottom: 0, flexDirection: "row" }]}>
                    <Label style={{ marginTop: 10, }}>{translate('BUILDING_FRONT_IMAGE')}</Label>
                    <TouchableOpacity onPress={() => {
                        setSelectedImageKey({ key: APP_PARAMS.BUILDING_FRONT_IMAGE, showKeyName: APP_PARAMS.BUILDING_FRONT_IMAGE_SHOW })
                        formProps.visiblaeChange(true)
                    }}>
                        <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('ADD_IMAGE')}</Label>
                    </TouchableOpacity>
                    {allState.state[APP_PARAMS.BUILDING_FRONT_IMAGE] != undefined && allState.state[APP_PARAMS.BUILDING_FRONT_IMAGE].length > 0 &&
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('VIEW_ALL')}</Label>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: "row", height: 50, marginLeft: 16, marginRight: 16, }}>
                    <View style={{ height: 50, flex: 1, }} >
                        {allState.state[APP_PARAMS.BUILDING_FRONT_IMAGE] != undefined && allState.state[APP_PARAMS.BUILDING_FRONT_IMAGE].length > 0 ? (
                            <FlatList
                                data={allState.state[APP_PARAMS.BUILDING_FRONT_IMAGE_SHOW]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={({ id }) => id}
                                renderItem={({ item }) => {
                                    return (<View style={{ marginRight: 10 }}>
                                        <Image
                                            style={{ height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: 'black' }}
                                            source={item != undefined ? { uri: item } : require('../../../assets/images/video.png')}
                                        />
                                    </View>)
                                }}
                            />) : (<TouchableOpacity onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.BUILDING_FRONT_IMAGE, showKeyName: APP_PARAMS.BUILDING_FRONT_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: colors.transparent_black }}>
                                    <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>{translate('ADD_NEW_IMAGE')}</Label>

                                </View></TouchableOpacity>)
                        }
                    </View>
                </View>
                <View style={[styles.formControlView, { paddingBottom: 0, flexDirection: "row" }]}>
                    <Label style={{ marginTop: 10, }}>{translate('DINING_PACKAGING_IMAGE')}</Label>
                    <TouchableOpacity onPress={() => {
                        setSelectedImageKey({ key: APP_PARAMS.DINING_PACKAGING_IMAGE, showKeyName: APP_PARAMS.DINING_PACKAGING_IMAGE_SHOW })
                        formProps.visiblaeChange(true)
                    }}>
                        <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('ADD_IMAGE')}</Label>
                    </TouchableOpacity>
                    {allState.state[APP_PARAMS.DINING_PACKAGING_IMAGE] != undefined && allState.state[APP_PARAMS.DINING_PACKAGING_IMAGE_SHOW].length > 0 &&
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('VIEW_ALL')}</Label>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: "row", height: 50, marginLeft: 16, marginRight: 16, }}>
                    <View style={{ height: 50, flex: 1, }} >

                        {allState.state[APP_PARAMS.DINING_PACKAGING_IMAGE] != undefined && allState.state[APP_PARAMS.DINING_PACKAGING_IMAGE].length > 0 ? (
                            <FlatList
                                data={allState.state[APP_PARAMS.DINING_PACKAGING_IMAGE_SHOW]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={({ id }) => id}
                                renderItem={({ item }) => {

                                    return (<View style={{ marginRight: 10 }}>
                                        <Image
                                            style={{ height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: 'black' }}
                                            source={item != undefined ? { uri: item } : require('../../../assets/images/video.png')}
                                        />
                                    </View>)
                                }}
                            />) : (<TouchableOpacity onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.DINING_PACKAGING_IMAGE, showKeyName: APP_PARAMS.DINING_PACKAGING_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: colors.transparent_black }}>
                                    <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>{translate('ADD_NEW_IMAGE')}</Label>

                                </View></TouchableOpacity>)
                        }
                    </View>
                </View>
                <View style={[styles.formControlView, { paddingBottom: 0, flexDirection: "row" }]}>
                    <Label style={{ marginTop: 10, }}>{translate('LOCALITY_IMAGE')}</Label>
                    <TouchableOpacity onPress={() => {
                        setSelectedImageKey({ key: APP_PARAMS.LOCALITY_IMAGE, showKeyName: APP_PARAMS.LOCALITY_IMAGE_SHOW })
                        formProps.visiblaeChange(true)
                    }}>
                        <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('ADD_IMAGE')}</Label>
                    </TouchableOpacity>
                    {allState.state[APP_PARAMS.LOCALITY_IMAGE] != undefined && allState.state[APP_PARAMS.LOCALITY_IMAGE_SHOW].length > 0 &&
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Label style={{ marginTop: 10, marginLeft: 15, color: colors.green_dark }}>{translate('VIEW_ALL')}</Label>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: "row", height: 50, marginLeft: 16, marginRight: 16, marginBottom: 10 }}>
                    <View style={{ height: 50, flex: 1, }} >
                        {allState.state[APP_PARAMS.LOCALITY_IMAGE] != undefined && allState.state[APP_PARAMS.LOCALITY_IMAGE].length > 0 ? (
                            <FlatList
                                data={allState.state[APP_PARAMS.LOCALITY_IMAGE_SHOW]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={({ id }) => id}
                                renderItem={({ item }) => {
                                    return (<View style={{ marginRight: 10 }}>
                                        <Image
                                            style={{ height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: 'black' }}
                                            source={item != undefined ? { uri: item } : require('../../../assets/images/video.png')}
                                        />
                                    </View>)
                                }}
                            />) : (<TouchableOpacity onPress={() => {
                                setSelectedImageKey({ key: APP_PARAMS.LOCALITY_IMAGE, showKeyName: APP_PARAMS.LOCALITY_IMAGE_SHOW })
                                formProps.visiblaeChange(true)
                            }}>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', height: DIMENS.reg_img_h, width: DIMENS.reg_img_w, borderRadius: DIMENS.reg_img_rad, backgroundColor: colors.transparent_black }}>
                                    <Label style={{ color: colors.primary, fontSize: 10, textAlign: 'center' }}>{translate('ADD_NEW_IMAGE')}</Label>
                                </View></TouchableOpacity>)
                        }
                    </View>
                </View>
                {submitError ? (
                    <Label style={{ alignSelf: 'center', color: colors.error }}>
                        {submitError}
                    </Label>
                ) : null}
                <CustomImagePicker
                    selectedImageKey={selectedImageKey}
                    isShowImagePicker={formProps.isShowImagePicker}
                    visiblaeChange={formProps.visiblaeChange}
                ></CustomImagePicker>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}