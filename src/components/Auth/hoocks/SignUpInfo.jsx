import React, { useEffect, useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform, TouchableOpacity,
    ScrollView,
    Text, Image,
    View,
    FlatList,
    Modal
} from 'react-native'
import { Form, Field } from 'react-final-form'
import FormTextInput from '../../FormTextInput'
import styles from './../styles'
import { colors } from '../../../theme'
import translate from '../../../i18n/i18n';
import DropDown from '../../DropDown';
import CommonTimePiker from '../../CommonTimePiker';
import Checkbox from '../../Checkbox';

const Header = ({ children, style }) => (
    <Text style={[styles.header, style]}>
        {children}
    </Text>
)

const Label = ({ children, style }) => (
    <Text style={[styles.label, style]}>
        {children}
    </Text>
)

export default renderForm = (formProps) => {

    const {
        handleSubmit,
        invalid,
        pristine,
        submitError,
        country,
        stateData,
        city,
        region,
        selectedCountry,
        selectedState,
        selectedCity,
        selectedRegion,
        pageFlag,
        //myProfile,
        thisProps,
        type,
    } = formProps

    const [dayList, setDayList] = useState([
        {
            name: "Sunday",
            category:
                [
                    {
                        cat: "DineIn",
                        inputArr: [],
                        showAvailableCategorySlots: false
                    },
                    {
                        cat: "TakeAway",
                        inputArr: [],
                        showAvailableCategorySlots: false
                    },
                    {
                        cat: "Delivery",
                        inputArr: [],
                        showAvailableCategorySlots: false
                    }
                ],
            showAvailableDayCategories: false,
        }, {
            name: "Monday",
            category: [{ cat: "DineIn", inputArr: [], showAvailableCategorySlots: false }, { cat: "TakeAway", inputArr: [], showAvailableCategorySlots: false }, { cat: "Delivery", inputArr: [], showAvailableCategorySlots: false }],
            showAvailableDayCategories: false
        }, {
            name: "Tuesday",
            category: [{ cat: "DineIn", inputArr: [], showAvailableCategorySlots: false }, { cat: "TakeAway", inputArr: [], showAvailableCategorySlots: false }, { cat: "Delivery", inputArr: [], showAvailableCategorySlots: false }],
            showAvailableDayCategories: false
        }, {
            name: "Wednesday",
            category: [{ cat: "DineIn", inputArr: [], showAvailableCategorySlots: false }, { cat: "TakeAway", inputArr: [], showAvailableCategorySlots: false }, { cat: "Delivery", inputArr: [], showAvailableCategorySlots: false }],
            showAvailableDayCategories: false
        }, {
            name: "Thrusday",
            category: [{ cat: "DineIn", inputArr: [], showAvailableCategorySlots: false }, { cat: "TakeAway", inputArr: [], showAvailableCategorySlots: false }, { cat: "Delivery", inputArr: [], showAvailableCategorySlots: false }],
            showAvailableDayCategories: false
        }, {
            name: "Friday",
            category: [{ cat: "DineIn", inputArr: [], showAvailableCategorySlots: false }, { cat: "TakeAway", inputArr: [], showAvailableCategorySlots: false }, { cat: "Delivery", inputArr: [], showAvailableCategorySlots: false }],
            showAvailableDayCategories: false
        }, {
            name: "Saturday",
            category: [{ cat: "DineIn", inputArr: [], showAvailableCategorySlots: false }, { cat: "TakeAway", inputArr: [], showAvailableCategorySlots: false }, { cat: "Delivery", inputArr: [], showAvailableCategorySlots: false }],
            showAvailableDayCategories: false
        },
    ])

    const { loading, myProfile } = thisProps
    const submitDisabled = pristine || invalid
    const submitStyles = submitDisabled ?
        [styles.submitBtn, styles.submitBtnDisabled] :
        styles.submitBtn
    const [serviceType, setServiceType] = useState(dayList)
    const [updatedServiceType, setUpdatedServiceType] = useState(false)

    const [count, setCount] = useState(0);
    const [openingTime, setOpeningTime] = useState('')
    const [closingTime, setClosingTime] = useState('')
    const [updateStates, setUpdateStates] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const [SMS, setSMS] = useState('')
    const [WhatsApp, setWhatsApp] = useState('')
    const [Fax, setFax] = useState('')
    const [Mail, setMail] = useState('')
    const [isDineIn, setisDineIn] = useState('')
    const [isTakeAway, setisTakeAway] = useState('')
    const [isDelivery, setisDelivery] = useState('')
    const [Online, setOnline] = useState('')
    const [Cash, setCash] = useState('')
    const [Done, setDone] = useState('')
    // useEffect(() => {
    console.log("detail:::::", formProps)
    // }, [])
    console.log("myProfile Data...........", thisProps.myProfile)

    const clickedOnHeader = (index) => {
        console.log('clicked cell', index);

        // `${Utility.convertTimeFromMiliseconds(item[Constants.KEY_DUTY_START_TIME], 'h:mmtt' )} - ${Utility.convertTimeFromMiliseconds(item[Constants.KEY_DUTY_START_TIME], 'h:mmtt')}`
        let { list } = serviceType;
        list = serviceType.map((item, inx) => {
            item.showAvailableDayCategories = index == inx ? !item.showAvailableDayCategories : item.showAvailableDayCategories
            item.transform = item.showAvailableDayCategories ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]
            return item;
        })
        setServiceType(list)
    }

    const clickedOnCategory = (index) => {
        console.log('clicked cell', index);

        // `${Utility.convertTimeFromMiliseconds(item[Constants.KEY_DUTY_START_TIME], 'h:mmtt' )} - ${Utility.convertTimeFromMiliseconds(item[Constants.KEY_DUTY_START_TIME], 'h:mmtt')}`
        let { lists } = serviceType;
        console.log("fgdfgdfgd", serviceType);
        list = serviceType[index].category.map((item, inx) => {
            console.log("item of category", item, inx);
            item.showAvailableCategorySlots = index == inx ? !item.showAvailableCategorySlots : item.showAvailableCategorySlots
            console.log("here is the item.isSelectCat Value.......", item.showAvailableCategorySlots);
            // item.transform = item.isSelected ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]
            return item;
        })
        console.log("list......", list);
        serviceType[index].category = list;
        console.log("serviceType.........................", serviceType);
        setServiceType(serviceType);

        setCount(previousCount => previousCount + 1);
    }
    const addThisCategorySlot = (dayIndex, dayCategoryIndex) => {
        dayList[dayIndex].category[dayCategoryIndex].inputArr.push({
            opeing: '5:00',
            closing: '5.00'
        })
        setUpdateStates(!updateStates)
        console.log("day list after adding category slot   ==  ", dayList)
    }

    const removeThisCategorySlot = (dayIndex, dayCategoryIndex, dayCategorySlotsIndex) => {
        dayList[dayIndex].category[dayCategoryIndex].inputArr.splice(dayCategorySlotsIndex, 1);
        setUpdateStates(!updateStates)
        console.log("day list after removing category slot   ==  ", dayList)
    }

    const renderExpandableList = (item, index) => {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => clickedOnHeader(index)}
                >
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#c52724',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        margin: 10,
                        marginBottom: 0
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: '#c52724',
                            fontWeight: 'bold'
                        }}>{item.name}
                        </Text>
                        <Image
                            source={require('../../../assets/images/downarr_red.png')}
                            style={{
                                width: 12,
                                height: 12,
                                marginLeft: 5,
                                transform: item.transform,
                                resizeMode: 'center'
                            }} />
                    </View>
                </TouchableOpacity>
                <View >
                    {item.showAvailableDayCategories == true && (
                        item.category.map((type, catIndex) => {
                            return (
                                <View
                                    style={{
                                        borderColor: '#ddd', borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 2,
                                        elevation: 1, marginLeft: 10, marginRight: 10, marginTop: 5
                                    }}>

                                    <View style={{
                                        padding: 20,
                                        paddingBottom: 15
                                    }}>
                                        <TouchableOpacity activeOpacity={1}
                                            onPress={() => {
                                                dayList[index].category[catIndex].showAvailableCategorySlots = type.showAvailableCategorySlots ? false : true
                                                setUpdateStates(!updateStates)
                                            }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: 'gray',
                                                fontWeight: 'bold'
                                            }}>{type.cat}</Text>
                                        </TouchableOpacity>

                                        {type.showAvailableCategorySlots == true && <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>

                                            {type.inputArr.map((dayCategorySlots, dayCategorySlotsIndex) => {
                                                return (
                                                    <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                                                        <View style={{ flex: 1, }}>
                                                            <Label>{translate('OPENING_TIME')}</Label>
                                                            <CommonTimePiker
                                                                onClick={formProps.openingDatePick}
                                                            // time={myProfile != undefined ? myProfile.data.restro_detail.opening_time : undefined}
                                                            />
                                                        </View>
                                                        <View style={{ marginLeft: 20, flex: 1, }}>
                                                            <Label>{translate('CLOSING_TIME')}</Label>
                                                            <CommonTimePiker
                                                                onClick={formProps.openingDatePick}
                                                            />
                                                        </View>
                                                        <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, marginTop: 6, backgroundColor: '#c52724', justifyContent: 'center', marginLeft: 8 }} onPress={() => removeThisCategorySlot(index, catIndex, dayCategorySlotsIndex)}>
                                                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }}>
                                                                -
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })}

                                            <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, marginTop: 10, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => addThisCategorySlot(index, catIndex)}>
                                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }}>
                                                    +
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                        }
                                    </View>
                                    <View style={{
                                        marginHorizontal: 15,
                                        backgroundColor: 'lightgrey'
                                    }} />
                                </View>
                            )
                        })

                    )}
                </View>
            </View>
        );
    }

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
                <Text style={{ color: colors.black, fontSize: 16, marginVertical: 10 }}>
                    {
                        translate('RESTAURANT_INFORMATION')
                    }
                </Text>
                <View style={styles.formControlView}>
                    <Label>{translate('RESTAURANT_NAME')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="restaurantName"
                        // onSubmitEditing={() => this.emailRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="restaurantName"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.name : undefined}

                    />
                </View>

                <View style={styles.formControlView}>
                    <Label>{translate('RESTAURANT_NAME_DE')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="restaurantName"
                        // onSubmitEditing={() => this.emailRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="restaurantName"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.name_de : undefined}

                    />
                </View>

                <View style={styles.formControlView}>
                    <Label>{translate('Email')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.emailRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="email"
                        onSubmitEditing={() => this.phoneRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="email"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.email : undefined}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('PHONE')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.phoneRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="phone"
                        onSubmitEditing={() => this.ladLineRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="phone"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.phone : undefined}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('LANDLINE_NUMBER')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.ladLineRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="landlineNumber"
                        onSubmitEditing={() => this.websiteRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="landlineNumber"
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.landline_number : undefined}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('WEBSITE_LINK')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.websiteRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="websiteLink"
                        onSubmitEditing={() => this.mapRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.webiste_link : undefined}
                    />
                </View>

                {/* <View style={styles.formControlView}>
                    <Label>{translate('Map Location:')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.websiteRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="websiteLink"
                        onSubmitEditing={() => this.mapRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.lat: undefined}
                    />
                </View> */}
                <View style={styles.formControlView}>
                    <Label>{translate('MAP')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        inputRef={_ref => this.mapRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="Map"
                        onSubmitEditing={() => this.addressLine1Ref.focus()}

                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="map"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ?
                            myProfile.data.restro_detail.lat + ', ' + myProfile.data.restro_detail.lng : undefined}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SELECT_COUNTRY')}</Label>
                    <DropDown
                        onChange={formProps.countryPicker}
                        selectedItem={selectedCountry}
                        listData={country != undefined ? country : []}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SELECT_STATE')}</Label>
                    <DropDown
                        onChange={formProps.statePicker}
                        selectedItem={selectedState}
                        listData={stateData != undefined ? stateData : []}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SELECT_CITY')}</Label>
                    <DropDown
                        onChange={formProps.cityPicker}
                        selectedItem={selectedCity}
                        listData={city != undefined ? city : []}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('SELECT_REGION')}</Label>
                    <DropDown
                        onChange={formProps.regionPicker}
                        selectedItem={selectedRegion}
                        listData={region != undefined ? region : []}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('ADDRESS_LINE_1')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.addressLine1Ref = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="addressLine1"
                        onSubmitEditing={() => this.addressLine2Ref.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="addressLine1"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.house_name_and_no : undefined}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('ADDRESS_LINE_2')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.addressLine2Ref = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="addressLine2"
                        onSubmitEditing={() => this.addressLine3Ref.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="map"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.street_name : undefined}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('ADDRESS_LINE_3')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.addressLine3Ref = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="addressLine3"
                        onSubmitEditing={() => this.addressLine4Ref.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="map"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.area_name : undefined}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('ADDRESS_LINE_4')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.addressLine4Ref = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="addressLine4"
                        onSubmitEditing={() => this.zipCodeRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="addressLine4"
                        underlineColorAndroid={colors.transparent}
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.landmark : undefined}
                    />
                </View>
                <View style={styles.formControlView}>
                    <Label>{translate('ZIP_CODE')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.zipCodeRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        name="zipCode"
                        onSubmitEditing={() => this.passwordRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        textContentType="Zipcode"
                        underlineColorAndroid={colors.transparent}
                        keyboardType="numeric"
                        initialValue={myProfile != undefined ? myProfile.data.restro_detail.zip + '' : undefined}
                    />
                </View>

                {/* <View style={styles.formControlView}>
                    <Label>Notification Types *</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.zipCodeRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        // name="zipCode"
                        // onSubmitEditing={() => this.passwordRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        // textContentType="Zipcode"
                        underlineColorAndroid={colors.transparent}
                        // keyboardType="numeric"
                        // initialValue={myProfile != undefined ? myProfile.data.restro_detail.zip + '' : undefined}
                    />
                </View>

                <View style={styles.formControlView}>
                    <Label>Delivery Types *</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.zipCodeRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        // name="zipCode"
                        // onSubmitEditing={() => this.passwordRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        // textContentType="Zipcode"
                        underlineColorAndroid={colors.transparent}
                        // keyboardType="numeric"
                        // initialValue={myProfile != undefined ? myProfile.data.restro_detail.zip + '' : undefined}
                    />
                </View>

                <View style={styles.formControlView}>
                    <Label>Payment Types *</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.zipCodeRef = _ref}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        component={FormTextInput}
                        editable={!loading}
                        // name="zipCode"
                        // onSubmitEditing={() => this.passwordRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        // textContentType="Zipcode"
                        underlineColorAndroid={colors.transparent}
                        // keyboardType="numeric"
                        // initialValue={myProfile != undefined ? myProfile.data.restro_detail.zip + '' : undefined}
                    />
                </View> */}

                <View style={styles.formControlView}>
                    <Label>Select Notification Type</Label>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => this.setSMS({ SMS: !SMS })}>
                            <Checkbox checked={SMS} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>SMS</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ WhatsApp: !WhatsApp })}>
                            <Checkbox checked={WhatsApp} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>What's App</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ Fax: !Fax })}>
                            <Checkbox checked={Fax} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>Fax</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ Mail: !Mail })}>
                            <Checkbox checked={Mail} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>Mail</Text>
                    </View>

                </View>

                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15 }}>
                    <TouchableOpacity onPress={() => this.setState({ Done: !Done })}>
                        <Checkbox checked={Done} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10 }}>Done</Text>
                </View>


                <View style={styles.formControlView}>
                    <Label>Delivery Type</Label>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => this.setState({ isDineIn: !isDineIn })}>
                            <Checkbox checked={isDineIn} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>{translate('DINE_IN')}</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ isTakeAway: !isTakeAway })}>
                            <Checkbox checked={isTakeAway} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>{translate('TAKE_AWAY')}</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ isDelivery: !isDelivery })}>
                            <Checkbox checked={isDelivery} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>{translate('DELIVERY')}</Text>
                    </View>

                </View>

                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15 }}>
                    <TouchableOpacity onPress={() => this.setState({ Done: !Done })}>
                        <Checkbox checked={Done} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10 }}>Done</Text>
                </View>


                <View style={styles.formControlView}>
                    <Label>Payment Type</Label>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => this.setState({ Online: !Online })}>
                            <Checkbox checked={Online} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>Online</Text>
                    </View>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ Cash: !Cash })}>
                            <Checkbox checked={Cash} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>Cash</Text>
                    </View>


                </View>

                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15 }}>
                    <TouchableOpacity onPress={() => this.setState({ Done: !Done })}>
                        <Checkbox checked={Done} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10 }}>Done</Text>
                </View>
                {/* <View style={[styles.formControlView, {
                    flexDirection: 'row',
                }]} >
                    <View style={{ flex: 1 }}>
                        <Label>{translate('OPENING_TIME')}</Label>
                        <CommonTimePiker
                            onClick={formProps.openingDatePick}
                            time={myProfile != undefined ? myProfile.data.restro_detail.opening_time : undefined}
                        />
                    </View>
                    <View style={{ marginLeft: 20, flex: 1 }}>
                        <Label>{translate('CLOSING_TIME')}</Label>
                        <CommonTimePiker
                            onClick={formProps.closingDatePick}
                            time={myProfile != undefined ? myProfile.data.restro_detail.closing_time : undefined}
                        />
                    </View>
                </View> */}

                <View style={styles.formControlView}>
                    <Label>{translate('SERVICE_TIME_SLOT')}</Label>
                    <View>
                        <FlatList style={{ margin: 15 }}
                            data={serviceType}
                            renderItem={({ item, index }) => renderExpandableList(item, index)}
                            extraData={updatedServiceType}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                {/* {formProps.type == 'signup' || formProps.type == 'myprofile' && */}
                <View style={styles.formControlView}>
                    <Label>{translate('Password')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        autoCapitalize="none"
                        component={FormTextInput}
                        editable={!loading}
                        // inputRef={_ref => this.passwordRef = _ref}
                        name="password"
                        onSubmitEditing={() => this.confirmPasswordRef.focus()}
                        returnKeyType="next"
                        style={styles.textInput}
                        underlineColorAndroid={colors.transparent}
                        secureTextEntry={true}
                    />
                </View>
                {/* } */}
                {/* {formProps.type == 'signup' || formProps.type == 'myprofile' && */}
                <View style={styles.formControlView}>
                    <Label>{translate('CONFIRM_PASSWORD')}</Label>
                    <Field
                        activeStyle={styles.textInputActive}
                        // inputRef={_ref => this.confirmPasswordRef = _ref}
                        autoCapitalize="none"
                        component={FormTextInput}
                        editable={!loading}
                        name="confirmPassword"
                        // /onSubmitEditing={handleSubmit(formProps)}
                        returnKeyType="done"
                        style={styles.textInput}
                        underlineColorAndroid={colors.transparent}
                        secureTextEntry={true}
                    />
                </View>
                {/* } */}
                {submitError ? (
                    <Label style={{ alignSelf: 'center', color: colors.error }}>
                        {submitError}
                    </Label>
                ) : null}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}