import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Image,
    Keyboard
} from 'react-native'
import { Form, Field } from 'react-final-form'
import DropDown from '../DropDown'
import FormTextInput from '../FormTextInput'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import {
    APP_PARAMS, SCREEN, DIMENS, ADD_PRODUCTS_TYPE_ERRORS, DATE_FORMAT
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn';
import { storeData, retrieveData } from "../../utility/Utils"
import CommonDatePiker from '../CommonDatePiker'
import Checkbox from '../Checkbox'
import CustomImagePicker from '../CommonImagePiker'
import CommonLoader from '../../common/CommonLoader'
import { showErrorToast, showSuccessToast } from '../../utility/Toast';

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

export default class AddProductType extends React.Component {

    constructor(props) {
        super(props)
        let productTypeItem = this.props.navigation.getParam('item');
        this.state = {
            isShowImagePicker: false,
            imageData: undefined,
            categoryName: productTypeItem != undefined ? productTypeItem.label : '',
            categoryName_de: productTypeItem != undefined ? productTypeItem.label_de : '',
            discription: productTypeItem != undefined ? productTypeItem.description : '',
            description_de: productTypeItem != undefined ? productTypeItem.description_de : '',
            productTypeId: productTypeItem != undefined ? productTypeItem._id : '',
            toBeAdd: productTypeItem != undefined ? false : true,
            toBeEdit: productTypeItem != undefined ? true : false,
            serverImage: productTypeItem != undefined ? productTypeItem.image : undefined,
            updateImage: false,
        }
        console.log("Keshav ProductType", productTypeItem)
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

    submit = (requestData) => {
        if (this.state.imageData == undefined && this.state.serverImage == undefined) {
            showErrorToast(translate("ADD_PRODUCTS_TYPE_ERRORS_ERR_IMAGE"))
        } else {
            if (requestData.categoryName == '') {
                showErrorToast(translate("ADD_PRODUCTS_TYPE_ERRORS_ERR_CATEGORY_NAME"))
            }
            else {
                if (requestData.categoryName_de == '') {
                    showErrorToast(translate("ADD_PRODUCTS_TYPE_ERRORS_ERR_CATEGORY_NAME_DE"))
                }
                else{
                if (requestData.description == '') {
                    showErrorToast(translate("ADD_PRODUCTS_TYPE_ERRORS_ERR_DESCRIPTION"))
                }
                else {
                    if (requestData.description_de == '') {
                        showErrorToast(translate("ADD_PRODUCTS_TYPE_ERRORS_ERR_DESCRIPTION_DE"))
                    }
                    else{
                    if (this.state.toBeEdit) {
                        this.updateProductType(requestData)
                    }
                    else {
                        this.addProductType(requestData);
                    }
                }
              }
            }
          }
        }
    }

    addProductType = (requestData) => {
        let imageData = undefined;
        if (this.state.imageData != undefined) {
            imageData = Object.assign({}, this.state.imageData)
            delete imageData.path
        }

        const { addCategoryApi } = this.props

        requestData.image = imageData;
        requestData[APP_PARAMS.USERID] = global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID]
        requestData[APP_PARAMS.ROLE] = global[APP_PARAMS.USER_DATA][APP_PARAMS.ROLE]
        addCategoryApi(requestData)
        this.props.navigation.navigate('ProductType', {})
    }

    updateProductType = (requestData) => {
        let imageData = undefined;
        if (this.state.imageData != undefined) {
            imageData = Object.assign({}, this.state.imageData)
            delete imageData.path
        }

        console.log("Keshav JAngir ImageData",this.state.imageData)

        const { editCategoryApi } = this.props

        requestData[APP_PARAMS.USERID] = global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID]
        requestData[APP_PARAMS.ROLE] = global[APP_PARAMS.USER_DATA][APP_PARAMS.ROLE]
        requestData.image = this.state.updateImage == true ? imageData : this.state.serverImage   //this.state.imageData != undefined ? imageData : this.state.serverImage;
        requestData[APP_PARAMS._ID] = this.state.productTypeId
        editCategoryApi(requestData)
        this.props.navigation.navigate('ProductType', {})
    }

    connectAndRedirect = () => {
    }

    changeShowImagePicker = (isShow, imageObje) => {
        if (imageObje != undefined && imageObje.key != undefined && imageObje.keyValue) {
            let imageData = imageObje;
            this.setState({
                imageData: imageData.keyValue,
                updateImage: true,
            })
        } else {
            this.setState({ isShowImagePicker: isShow })
        }
    }

    renderForm = (formProps) => {

        const { handleSubmit, invalid, pristine, submitError } = formProps
        const { loading } = this.props
        const submitDisabled = pristine || invalid || loading
        const submitStyles = this.state.toBeEdit ? styles.submitBtn : submitDisabled ?
            [styles.submitBtn, styles.submitBtnDisabled] : styles.submitBtn;
        const {
            categoryName,
            categoryName_de,
            discription,
            description_de
         } = this.state
        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding' })}
                style={[styles.topView, { paddingVertical: 0 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Add Product Type'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={[styles.scrollView, { maginVertical: 0 }]}
                >
                    <View style={{ alignItems: "center", }}>
                        <TouchableOpacity style={{ alignItems: "center", }}
                            onPress={() => {
                                this.setState({ isShowImagePicker: true })
                            }}>
                            <Image
                                style={{
                                    height: DIMENS.pro_img_height, width: DIMENS.pro_img_width, borderRadius: DIMENS.pro_img_redius,
                                    backgroundColor: colors.white, borderColor:'lightgray', borderWidth:1, marginVertical:15
                                }}
                                source={this.state.imageData != undefined ? { uri: this.state.imageData.uri } : { uri: this.state.serverImage }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('CATEGORY_NAME')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="label"
                            inputRef={_ref => this.categoryName = _ref}
                            onSubmitEditing={() => this.categoryName_de.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="categoryName"
                            underlineColorAndroid={colors.transparent}
                            initialValue={categoryName != '' ? categoryName : ''}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('CATEGORY_NAME_DE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="label_de"
                            inputRef={_ref => this.categoryName_de = _ref}
                            onSubmitEditing={() => this.description.focus()}
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="categoryName"
                            underlineColorAndroid={colors.transparent}
                            initialValue={categoryName_de != '' ? categoryName_de : ''}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('DISCRIPTION')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="description"
                            inputRef={_ref => this.description = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType="done"
                            style={styles.textInput}
                            textContentType="discription"
                            underlineColorAndroid={colors.transparent}
                            initialValue={discription != '' ? discription : ''}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('DISCRIPTION_DE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="description_de"
                            inputRef={_ref => this.description_de = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            returnKeyType="done"
                            style={styles.textInput}
                            textContentType="description_de"
                            underlineColorAndroid={colors.transparent}
                            initialValue={description_de != '' ? description_de : ''}
                        />
                    </View>

                    {submitError ? (
                        <Label style={{ alignSelf: 'center', color: colors.error }}>
                            {submitError}
                        </Label>
                    ) : null}

                    <CommonSubmitBtn
                        //={submitDisabled}
                        handleSubmit={handleSubmit}
                        submitStyles={submitStyles}
                        submitBtnText={styles.submitBtnText}
                        loading={loading}
                        //title={translate('SAVE')}
                        title={this.state.toBeEdit ? translate('EDIT') : translate('SAVE')}
                    ></CommonSubmitBtn>

                    {
                        this.state.isShowImagePicker &&
                        <CustomImagePicker
                            selectedImageKey={{ key: APP_PARAMS.ADD_PRODUCT_TYPE_IMAGE, showKeyName: APP_PARAMS.ADD_PRODUCT_TYPE_IMAGE_SHOW }}
                            isShowImagePicker={this.state.isShowImagePicker}
                            visiblaeChange={this.changeShowImagePicker}
                        >
                        </CustomImagePicker>
                    }
                    {/* <CommonLoader modalVisible={loading}></CommonLoader> */}
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

