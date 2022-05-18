import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Image, StyleSheet, Keyboard
} from 'react-native'
import { Form, Field } from 'react-final-form'

import FormTextInput from '../FormTextInput'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import {
    APP_PARAMS, SCREEN, DIMENS,
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn';
import { storeData, retrieveData } from "../../utility/Utils"
import CommonDatePiker from '../CommonDatePiker'
import CustomImagePicker from '../CommonImagePiker'
import CommonLoader from '../../common/CommonLoader'
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

export default class DiscountManagement extends React.Component {

    constructor(props) {
        super(props)
        this.getDiscountDetails();
        const { discountDetails } = this.props
        this.state = {
            selectDate: null,
            valid_to: null,
            valid_from: null,
            isShowImagePicker: false,
            discountData: undefined,
            imageData: undefined,
            showSuccessToast: false
        }
    }

    onStartDateChange = (date) => {
        this.setState({ valid_from: date })
    }
    onEndDateChange = (date) => {
        this.setState({ valid_to: date })
    }

    menuHandle = () => {
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        if (isDrawerOpen) {
            this.props.navigation.closeDrawer();
        } else {
            this.props.navigation.openDrawer();
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            null
        ),
    })

    validate = (values) => {
    }

    getDiscountDetails = async () => {
        const { callDiscountApi } = this.props
        let reqData = { [APP_PARAMS.CREATED_BY]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID] }
        callDiscountApi(reqData);
    }

    submit = async (requestData, username) => {
        const { discountDetails, editDiscountApi } = this.props
        let imageData = undefined;
        if (this.state.imageData != undefined) {
            imageData = Object.assign({}, this.state.imageData)
            delete imageData.path
        }

        requestData.valid_from = this.state.valid_from;
        requestData.valid_to = this.state.valid_to;
        requestData._id = this.props.discountDetails._id
        requestData.created_by_user_type = this.props.discountDetails.created_by_user_type
        requestData.created_by = this.props.discountDetails.created_by
        requestData.image = this.state.imageData

        editDiscountApi(requestData).then((res) => {
            res != undefined && res != '' && res != null && this.setState({ showSuccessToast: true })
        })
    }

    connectAndRedirect = () => {
    }

    changeShowImagePicker = (isShow, imageObje) => {
        if (imageObje != undefined && imageObje.key != undefined && imageObje.keyValue) {
            let imageData = imageObje;
            this.setState({
                imageData: imageData.keyValue
            })
        } else {
            this.setState({ isShowImagePicker: isShow })
        }
    }

    renderForm = (formProps) => {
        const { handleSubmit, invalid, pristine, submitError } = formProps
        const { loading } = this.props

        const submitDisabled = pristine || invalid || loading
        const submitStyles = styles.submitBtn
        const { discountDetails } = this.props
        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding' })}
                style={[styles.topView, { paddingVertical: 0 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Add Discount'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={[styles.scrollView, { maginVertical: 0, }]}
                >
                    <TouchableOpacity style={{ alignItems: "center", }}
                        onPress={() => {
                            this.setState({ isShowImagePicker: true })
                        }}
                    >
                        <Image
                            style={{
                                height: DIMENS.pro_img_height, width: DIMENS.pro_img_width, borderRadius: DIMENS.pro_img_redius,
                                backgroundColor: colors.white, borderWidth:1,borderColor:'lightgray', marginVertical:15
                            }}
                            source={this.state.imageData == undefined ? discountDetails != undefined && { uri: discountDetails.image } : { uri: this.state.imageData.uri }}
                        />
                    </TouchableOpacity>

                    <View style={styles.formControlView}>
                        <Label>{translate('DISCOUNT_DETAILS')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name={"discount_detail"}
                            // value={this.state.discount_details}
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="Discount Details"
                            underlineColorAndroid={colors.transparent}
                            initialValue={discountDetails != undefined ? discountDetails.discount_detail : undefined}
                            inputRef={_ref => this.discountDetails = _ref}
                            onSubmitEditing={() => this.discountInPercent.focus()}
                        />
                    </View>
                    <View style={styles.formControlView}>
                        <Label>{translate('DISCOUNT_PERCENTAGE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            component={FormTextInput}
                            editable={!loading}
                            name="discount_in_percentage"
                            returnKeyType="done"
                            style={styles.textInput}
                            underlineColorAndroid={colors.transparent}
                            initialValue={discountDetails != undefined ? discountDetails.discount_in_percentage + "" : undefined}
                            inputRef={_ref => this.discountInPercent = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('VALID_FROM')}</Label>
                        <CommonDatePiker
                            style={{
                                backgroundColor: colors.white,
                                borderColor: colors.white,
                                borderRadius: 4,
                                borderWidth: StyleSheet.hairlineWidth,
                                color: colors.textGrey,
                                elevation: 3,
                                fontSize: 16,
                                shadowColor: colors.inputShadow,
                                shadowOffset: { height: 4, width: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 2,
                            }}
                            onDateChange={this.onStartDateChange}
                            date={this.state.valid_from != undefined ? this.state.valid_from : discountDetails != undefined && discountDetails.valid_from != undefined ? discountDetails.valid_from : undefined} />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('VALID_TO')}</Label>
                        <CommonDatePiker
                            style={{
                                backgroundColor: colors.white,
                                borderColor: colors.white,
                                borderRadius: 4,
                                borderWidth: StyleSheet.hairlineWidth,
                                color: colors.textGrey,
                                elevation: 3,
                                fontSize: 16,
                                shadowColor: colors.inputShadow,
                                shadowOffset: { height: 4, width: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 2,
                            }}
                            onDateChange={this.onEndDateChange}
                            date={this.state.valid_to != undefined ? this.state.valid_to : discountDetails != undefined && discountDetails.valid_to ? discountDetails.valid_to : undefined} />
                    </View>

                    {submitError ? (
                        <Label style={{ alignSelf: 'center', color: colors.error }}>
                            {submitError}
                        </Label>
                    ) : null}

                    <View style={{ marginBottom: 20, width: '100%' }}>
                        <CommonSubmitBtn
                            //={submitDisabled}
                            handleSubmit={handleSubmit}
                            submitStyles={[submitStyles, { maginVertical: 15 }]}
                            submitBtnText={styles.submitBtnText}
                            loading={loading}
                            title={('SAVE')}
                        ></CommonSubmitBtn>
                    </View>
                    {
                        this.state.isShowImagePicker &&
                        <CustomImagePicker
                            selectedImageKey={{ key: APP_PARAMS.DISCOUNT_MGMT_IMAGE, showKeyName: APP_PARAMS.DISCOUNT_MGMT_IMAGE_SHOW }}
                            isShowImagePicker={this.state.isShowImagePicker}
                            visiblaeChange={this.changeShowImagePicker}
                        ></CustomImagePicker>
                    }
                    {
                        this.state.showSuccessToast &&
                        showSuccessToast('SUCCESS')
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