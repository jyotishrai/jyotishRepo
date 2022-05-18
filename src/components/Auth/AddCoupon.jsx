import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Image
} from 'react-native'
import { Form, Field } from 'react-final-form'

import FormTextInput from '../FormTextInput'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import Styles from '../Dialogs/styles'
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import {
    APP_PARAMS, SCREEN, ADD_COUPON_ERRORS
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn';
import { storeData, retrieveData } from "../../utility/Utils"
import CommonDatePiker from '../CommonDatePiker'
import Checkbox from '../Checkbox'
import CommonLoader from '../../common/CommonLoader'
import CustomImagePicker from '../CommonImagePiker'
import { showErrorToast, showSuccessToast } from '../../utility/Toast';

//import firebase from 'firebase';
//import firebase, { firestore } from '../../firebase/Firebase';

const Header = ({ children, style }) => (
    <Text style={[styles.header, style]}>
        {children}
    </Text>
)

const Label = ({ children, style, onPress }) => (
    <Text style={[styles.label, style]} onPress={onPress}>
        {children}
    </Text>
)

export default class AddCoupon extends React.Component {

    constructor(props) {
        super(props)
        let couponItem = this.props.navigation.getParam('item')
        console.log("Keshav couponItem", couponItem)
        this.state = {
            valid_to: couponItem != undefined ? couponItem.valid_to : undefined,
            valid_from: couponItem != undefined ? couponItem.valid_from : undefined,
            isShowImagePicker: false,
            title: couponItem != undefined ? couponItem.title : undefined,
            couponTitle: couponItem != undefined ? couponItem.coupon_code : undefined,
            couponDetails: couponItem != undefined ? couponItem.coupon_detail : undefined,
            couponDetails_de: couponItem != undefined ? couponItem.coupon_detail_de : undefined,
            discount: couponItem != undefined ? couponItem.coupon_discount_in_percentage : undefined,
            maxDiscount: couponItem != undefined ? couponItem.coupon_max_discount_amount : undefined,
            minDiscount: couponItem != undefined ? couponItem.coupon_minimum_discount_amount : undefined,
            toBeEdit: couponItem != undefined && true,
            toBeAdd: couponItem == undefined && true,
            couponID: couponItem != undefined ? couponItem._id : undefined,
            imageKey: '',
            imageKeyShow: '',
            couponCodeLogoURI: couponItem != undefined ? couponItem.image : undefined,
            offerImageURI: couponItem != undefined ? couponItem.offer_image : undefined,
            couponCodeImageData: undefined,
            offerCodeImageData: undefined
        }
    }

    onStartDateChange = (date) => {
        this.setState({ valid_from: date }, () => {
            //      console.log('fromDate', this.state.valid_from);
        })
    }
    onEndDateChange = (date) => {
        this.setState({ valid_to: date })
    }

    menuHandle = () => {
        //     console.log("sdhjfjsbhdkf", this.props.navigation);
        this.props.navigation.toggleDrawer()
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    validate = (values) => { }

    submit = async (requestData) => {
        if (this.state.couponCodeLogoURI == undefined && this.state.couponCodeImageData == undefined) {
            showErrorToast(translate("ADD_COUPON_ERRORS_ERR_COUPON_CODE_IMAGE"))
        }
        else {
            if (this.state.offerImageURI == undefined && this.state.offerCodeImageData == undefined) {
                showErrorToast(translate("ADD_COUPON_ERRORS_ERR_OFFER_IMAGE"))
            }
            else {
                if (requestData.title == undefined) {
                    showErrorToast(translate("ADD_COUPON_ERRORS_ERR_TITLE"))
                }
                else {
                    if (requestData.coupon_code == undefined) {
                        showErrorToast(translate("ADD_COUPON_ERRORS_ERR_COUPON"))
                    }
                    else {
                        if (requestData.coupon_detail == undefined) {
                            showErrorToast(translate("ADD_COUPON_ERRORS_ERR_COUPON_DETAIL"))
                        }
                        else {
                            if (requestData.coupon_detail_de == undefined) {
                                showErrorToast(translate("ADD_COUPON_ERRORS_ERR_COUPON_DETAIL_DE"))
                            }
                            else{
                            if (this.state.discount == undefined && requestData.coupon_discount_in_percentage == undefined) {
                                showErrorToast(translate("ADD_COUPON_ERRORS_ERR_DISCOUNT"))
                            }
                            else {
                                if (requestData.coupon_max_discount_amount == undefined && this.state.maxDiscount == undefined) {
                                    showErrorToast(translate("ADD_COUPON_ERRORS_ERR_MAX_DISCOUNT"))
                                }
                                else {
                                    if (requestData.coupon_minimum_discount_amount == undefined && this.state.minDiscount == undefined) {
                                        showErrorToast(translate("ADD_COUPON_ERRORS_ERR_MIN_DISCOUNT"))
                                    }
                                    else {
                                        if (this.state.valid_from == undefined) {
                                            showErrorToast(translate("ADD_COUPON_ERRORS_ERR_VALID_FROM"))
                                        }
                                        else {
                                            if (this.state.valid_to == undefined) {
                                                showErrorToast(translate("ADD_COUPON_ERRORS_ERR_VALID_TO"))
                                            }
                                            else {
                                                this.addCoupon(requestData)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                  }

                }
            }
        }
    }

    addCoupon = async (requestData) => {

        let couponCodeImage = undefined;
        if (this.state.couponCodeImageData != undefined) {
            couponCodeImage = Object.assign({}, this.state.couponCodeImageData)
            delete couponCodeImage.path
        }


        let offerImage = undefined;
        if (this.state.offerCodeImageData != undefined) {
            offerImage = Object.assign({}, this.state.offerCodeImageData)
            delete offerImage.path
        }

        //alert(JSON.stringify(this.state.coupoCode))

        requestData.valid_from = this.state.valid_from;
        requestData.valid_to = this.state.valid_to;
        requestData[APP_PARAMS.USERID] = global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID]
        requestData[APP_PARAMS.CREATED_BY] = global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID]
        requestData[APP_PARAMS.CREATED_BY_NAME] = global[APP_PARAMS.USER_DATA][APP_PARAMS.NAME]
        requestData[APP_PARAMS.CREATED_BY_USER_TYPE] = global[APP_PARAMS.USER_DATA][APP_PARAMS.ROLE]
        requestData.image = couponCodeImage   //couponCodeImage.uri
        requestData.offer_image = offerImage   //offerImage.uri

        if (this.state.toBeAdd) {
            const { addCouponCodeApi } = this.props
            //    console.log("request data:::::::::::::::::", requestData);
            addCouponCodeApi(requestData)
               this.props.navigation.navigate('CouponManagement', {})
        }
        else if (this.state.toBeEdit) {
            requestData[APP_PARAMS._ID] = this.state.couponID
            const { editCouponCodeApi } = this.props
            //    console.log("request data:::::::::::::::::", requestData);
            editCouponCodeApi(requestData)
            this.props.navigation.navigate('CouponManagement', {})
        }
        //this.props.navigation.navigate('CouponManagement', {})
    }

    connectAndRedirect = () => {

    }

    changeShowImagePicker = (isShow, imageObje) => {
        if (imageObje != undefined && imageObje.key != undefined && imageObje.keyValue) {
            let keyName = imageObje.key;
            let showKeyName = imageObje.showKeyName;

            if (keyName == APP_PARAMS.ADD_COUPON_CODE_LOGO_IMAGE && showKeyName == APP_PARAMS.ADD_COUPON_CODE_LOGO_IMAGE_SHOW) {
                let imageData = imageObje;
                this.setState({
                    couponCodeImageData: imageData.keyValue,
                    imageKey: '',
                    imageKeyShow: ''
                })
            }
            else if (keyName == APP_PARAMS.ADD_COUPON_CODE_OFFER_IMAGE && showKeyName == APP_PARAMS.ADD_COUPON_CODE_OFFER_IMAGE_SHOW) {
                let imageData = imageObje;
                this.setState({
                    offerCodeImageData: imageData.keyValue,
                    imageKey: '',
                    imageKeyShow: ''
                })
            }
        } else {
            this.setState({ isShowImagePicker: isShow })
        }
    }

    renderForm = (formProps) => {

        const { handleSubmit, invalid, pristine, submitError } = formProps
        const { loading } = this.props
        const submitDisabled = pristine || invalid || loading
        const submitStyles = styles.submitBtn
        const { title,
            couponTitle,
            couponDetails,
            couponDetails_de,
            discount,
            maxDiscount,
            minDiscount,
            couponCodeLogoURI,
            offerImageURI,
            valid_from,
            valid_to } = this.state

        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding' })}
                style={[styles.topView, { paddingVertical: 0 }]}
            >
                <CommonHeader menuClick={() => this.menuHandle()} title={'Add Coupon'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center', }}
                    style={[styles.scrollView, { marginVertical: 20, flexGrow: 1 }]}
                >
                    <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => {
                                this.setState({
                                    isShowImagePicker: true,
                                    imageKey: APP_PARAMS.ADD_COUPON_CODE_LOGO_IMAGE,
                                    imageKeyShow: APP_PARAMS.ADD_COUPON_CODE_LOGO_IMAGE_SHOW
                                })
                            }}
                        >
                            <Image
                                style={{ height: 125, width: 125, borderRadius: 100, backgroundColor: 'white', marginRight: 20, borderColor:'lightgray', borderWidth:1 }}
                                source={this.state.couponCodeImageData != undefined ? { uri: this.state.couponCodeImageData.uri } : { uri: this.state.couponCodeLogoURI }}
                            />
                            <Label style={{ marginTop: 10,marginRight: 20, }}>{translate('COUPON_CODE_LOGO')}</Label>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => {
                                this.setState({
                                    isShowImagePicker: true,
                                    imageKey: APP_PARAMS.ADD_COUPON_CODE_OFFER_IMAGE,
                                    imageKeyShow: APP_PARAMS.ADD_COUPON_CODE_OFFER_IMAGE_SHOW
                                })
                            }}>
                            <Image
                                style={{ height: 125, width: 125, borderRadius: 100, backgroundColor: 'white', borderWidth:1, borderColor:'lightgray' }}
                                source={this.state.offerCodeImageData != undefined ? { uri: this.state.offerCodeImageData.uri } : { uri: this.state.offerImageURI }}

                            />
                            <Label style={{ marginTop: 10 }}>{translate('OFFER_IMAGE')}</Label>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('TITLE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="title"
                            onSubmitEditing={() => this.couponCodeRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="title"
                            underlineColorAndroid={colors.transparent}
                            initialValue={title != '' ? title : ''}
                        />
                    </View>
                    <View style={styles.formControlView}>
                        <Label>{translate('COUPON_CODE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            inputRef={_ref => this.couponCodeRef = _ref}
                            name="coupon_code"
                            onSubmitEditing={() => this.couponDetailRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={couponTitle != '' ? couponTitle : ''}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('COUPON_DETAILS')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            inputRef={_ref => this.couponDetailRef = _ref}
                            name="coupon_detail"
                            onSubmitEditing={() => this.couponDetailDeRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={couponDetails != '' ? couponDetails : ''}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('COUPON_DETAILS_DE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            inputRef={_ref => this.couponDetailDeRef = _ref}
                            name="coupon_detail_de"
                            onSubmitEditing={() => this.couponDiscountRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={couponDetails_de != '' ? couponDetails_de : ''}
                        />
                    </View>



                    <View style={styles.formControlView}>
                        <Label>{translate('DISCOUNT_IN_PERCENTAGE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            inputRef={_ref => this.couponDiscountRef = _ref}
                            name="coupon_discount_in_percentage"
                            onSubmitEditing={() => this.maxDiscountRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={discount != undefined ? discount + '' : undefined}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('MAX_DISCOUNT_AMOUNT')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            inputRef={_ref => this.maxDiscountRef = _ref}
                            name="coupon_max_discount_amount"
                            onSubmitEditing={() => this.minDiscountRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={maxDiscount != undefined ? maxDiscount + '' : undefined}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('MINIMUM_ORDER_AMOUNT')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            inputRef={_ref => this.minDiscountRef = _ref}
                            name="coupon_minimum_discount_amount"
                            //onSubmitEditing={() => this.couponDiscountRef.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={minDiscount != undefined ? minDiscount + '' : undefined}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('VALID_FROM')}</Label>
                        <View style={{backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    color: colors.textGrey,
    elevation: 3,
    fontSize: 16,
    paddingHorizontal: 10,
    //paddingVertical: 10,
    shadowColor: colors.inputShadow,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,}}>
                        <CommonDatePiker onDateChange={this.onStartDateChange}
                            date={valid_from}
                        />
                        </View>
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('VALID_TO')}</Label>
                        <View style={{backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    color: colors.textGrey,
    elevation: 3,
    fontSize: 16,
    paddingHorizontal: 10,
    //paddingVertical: 10,
    shadowColor: colors.inputShadow,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,}}>
                        <CommonDatePiker onDateChange={this.onEndDateChange}
                            date={valid_to}
                        />
                        </View>
                    </View>

                    {/* <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 15 }}>
                        <Checkbox />

                        <Text style={{ marginLeft: 10 }}>{translate('REMEMBER_ME')}</Text>
                    </View> */}

                    {submitError ? (
                        <Label style={{ alignSelf: 'center', color: colors.error }}>
                            {submitError}
                        </Label>
                    ) : null}

                    <CommonSubmitBtn
                        //submitDisabled={submitDisabled}
                        handleSubmit={handleSubmit}
                        submitStyles={submitStyles}
                        submitBtnText={styles.submitBtnText}
                        loading={loading}
                        title={this.state.toBeEdit ? translate('UPDATE') :('SAVE')}
                    ></CommonSubmitBtn>

                    {
                        this.state.isShowImagePicker &&
                        <CustomImagePicker
                            selectedImageKey={{ key: this.state.imageKey, showKeyName: this.state.imageKeyShow }}
                            isShowImagePicker={this.state.isShowImagePicker}
                            visiblaeChange={this.changeShowImagePicker}
                        ></CustomImagePicker>
                    }

                    <CommonLoader modalVisible={loading}></CommonLoader>

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    render() {
        return (
            <Form
                onSubmit={this.submit}
                render={this.renderForm}
                validate={this.validate}
            />
        )
    }

}