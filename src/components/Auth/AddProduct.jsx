

import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Image,
    Button,
    Keyboard,
    TextInput
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
    APP_PARAMS, SCREEN, DIMENS, ADD_PRODUCTS_ERRORS
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn';
import { storeData, retrieveData } from "../../utility/Utils"
import { showErrorToast, showInfoToast, showSuccessToast } from '../../utility/Toast';
import CommonDatePiker from '../CommonDatePiker'
import Checkbox from '../Checkbox'
import CustomImagePicker from '../CommonImagePiker'
import CommonLoader from '../../common/CommonLoader'

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

export default class AddProduct extends React.Component {

    constructor(props) {
        super(props);

        let productItem = this.props.navigation.getParam('item');
        this.filters = {};

        this.state = {
            cusinType: [
                {
                    name: APP_PARAMS.SELECT_ITEM,
                    label: APP_PARAMS.SELECT_ITEM
                },
                {
                    label: "Veg",
                    name: "veg"
                },
                {
                    label: "Non-Veg",
                    name: "non_veg"
                }
            ],
            cusinType: [
                {
                    name: APP_PARAMS.SELECT_ITEM,
                    label: APP_PARAMS.SELECT_ITEM
                },
                {
                    label: "Veg",
                    name: "veg"
                },
                {
                    label: "Non-Veg",
                    name: "non_veg"
                }
            ],
            selectedCusineType: undefined,
            selectedProductType: undefined,
            selectProductTypeId: undefined,
            isShowImagePicker: false,
            imageData: undefined,
            productTypeData: undefined,
            discountedPrice: productItem != undefined ? productItem.discounted_price : '',
            gstCharge: productItem != undefined ? productItem.gst_charge : '',
            toBeAdd: false,
            toBeEdit: true,
            name: productItem && productItem.name,
            name_de: productItem && productItem.name_de,
            cookingTime: productItem ? productItem.coocking_time_in_minute : '',
            price: productItem ? productItem.price : '',
            discPercent: productItem ? productItem.discount_in_percentage : '',
            gstPercent: productItem ? productItem.gst_in_perecent : '',
            finalValue: productItem != undefined ? productItem.final_price + '' : '',
            description: productItem && productItem.description,
            description_de: productItem && productItem.description_de,
            isRecommended: productItem && productItem.is_recommended,
            isDineIn: "",
            isTakeAway: "",
            isDelivery: "",
            serverImage: productItem && productItem.image,
            productID: productItem && productItem._id,
            isSelected: undefined,
            isSelectedSubAttribute: undefined,
            Price: "",
            Min: "",
            Title: "",
            ItemName: "",
            SubPrice: "",
            Attributes: [],
            attributeTitle: '',
            attributePrice: '',
            attributeMin: '',
            subAttributeItem: '',
            subAttributePrice: '',
            indexValueAttribute: 0,
        }
        this.updateForm()
        this.getProductType()
    }

    componentDidMount() {
        let productItem = this.props.navigation.getParam('item');
        if (productItem != undefined) {
            this.setState({
                finalValue: productItem != undefined ? productItem.final_price + '' : '',
            })
        }
    }

    updateForm = async () => {
        let productItem = this.props.navigation.getParam('item');
        if (productItem != undefined) {
            for (let i = 0; i < this.state.cusinType.length; i++) {
                if (productItem.product_type == this.state.cusinType[i].name) {
                    let tempCusineSelected = this.state.cusinType[i]
                    this.setState({
                        selectedCusineType: tempCusineSelected,
                    })
                    break;
                }
            }
            for (let i = 0; i < this.props.productType.length; i++) {
                if (this.props.productType[i]._id != undefined && this.props.productType[i]._id == productItem.product_cate_id) {
                    let tempProductTypeSelected = this.props.productType[i]
                    this.setState({
                        selectedProductType: tempProductTypeSelected,
                        selectProductTypeId: productItem.product_cate_id
                    })
                    break;
                }
            }
            this.setState({
                toBeAdd: false,
                toBeEdit: true,
            })
        }
        else {
            this.setState({
                toBeAdd: true,
                toBeEdit: false,
            })
        }
    }

    selectCusineType = (item, index) => {
        if (item != undefined && this.state.cusinType[index].label != undefined) {
            this.setState({
                selectedCusineType: (this.state.cusinType[index].label != APP_PARAMS.SELECT_ITEM &&
                    this.state.cusinType[index].label != undefined ?
                    this.state.cusinType[index] : undefined)
            })
        }
    }

    getProductType = () => {
        const { listAddProductTypeApi } = this.props;
        var dataReq = {
            [APP_PARAMS.USER_ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID],
        }
        listAddProductTypeApi(dataReq).then((res) => {
            if (res != undefined && res.data != undefined) {
                this.updateForm()
            }
        })
    }

    selectProductType = (item, index) => {
        if (item != undefined && this.props.productType[index].label != undefined) {
            this.setState({
                selectedProductType: (this.props.productType[index].label != APP_PARAMS.SELECT_ITEM &&
                    this.props.productType[index].label != undefined ?
                    this.props.productType[index] : undefined),
                selectProductTypeId: (this.props.productType[index]._id != undefined ?
                    this.props.productType[index]._id : undefined)
            })
        }
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

    submit = (requestData) => {
        if (this.state.imageData == undefined && this.state.serverImage == undefined) {
            showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_IMAGE"))
        } else {
            if (requestData.name == undefined) {
                showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_NAME"))
            }
            else {
                if (requestData.name.legth <= 2) {
                    showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_NAME_LENGTH"))
                }
                else {
                    if (requestData.name_de == undefined) {
                        showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_NAME_IN_GERMAN"))
                    } else {

                        if (this.state.selectedCusineType == undefined) {
                            showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_CUSINE"))
                        }
                        else {
                            if (requestData.coocking_time_in_minute == undefined) {
                                showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_COOKING_TIME"))
                            }
                            else {
                                if (requestData.price == undefined) {
                                    showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_PRICE"))
                                }
                                else {
                                    if (requestData.description == undefined) {
                                        showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_DESCRIPTION"))
                                    }
                                    else {
                                        if (requestData.description_de == undefined) {
                                            showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_DESCRIPTION_IN_GERMAN"))
                                        }
                                        else {
                                            if (this.state.selectedProductType == undefined) {
                                                showErrorToast(translate("ADD_PRODUCTS_ERRORS_ERR_PRODUCT_TYPE"))
                                            }
                                            else {
                                                if (this.state.toBeEdit) {
                                                    this.updateProduct(requestData)
                                                }
                                                else {
                                                    this.addProduct(requestData);
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

    addProduct = async (requestData) => {
        let imageData = undefined;
        if (this.state.imageData != undefined) {
            imageData = Object.assign({}, this.state.imageData)
            delete imageData.path
        }
        const { addProductApi } = this.props
        requestData.product_type = this.state.selectedCusineType.name;
        requestData.final_price = this.state.finalValue;
        requestData.is_recommended = this.state.isRecommended;
        requestData.product_cate_id = this.state.selectProductTypeId;
        requestData.image = imageData;    //imageData.uri;
        requestData.discounted_price = this.state.discountedPrice;
        requestData[APP_PARAMS.RESTRO_ID] = global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID];
        requestData.stock_availability = 1;
        requestData.gst_charge = this.state.gstCharge;
        addProductApi(requestData)
        this.props.navigation.navigate('ProductManagement', {})
    }

    updateProduct = async (requestData) => {
        // alert(this.state.selectProductTypeId)
        let imageData = undefined;
        if (this.state.imageData != undefined) {
            imageData = Object.assign({}, this.state.imageData.keyValue)
            delete imageData.path
        }
        const { updateProductApi } = this.props
        requestData._id = this.state.productID;
        requestData.product_type = this.state.selectedCusineType.name;
        requestData.final_price = this.state.finalValue;
        requestData.is_recommended = this.state.isRecommended;
        requestData.product_cate_id = this.state.selectProductTypeId;
        requestData.image = this.state.imageData != undefined ? imageData : this.state.serverImage;
        requestData.discounted_price = this.state.discountedPrice;
        requestData[APP_PARAMS.RESTRO_ID] = global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID];
        requestData.stock_availability = 1;
        requestData.gst_charge = this.state.gstCharge;
        updateProductApi(requestData)
        this.props.navigation.navigate('ProductManagement', {})
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

    validate = (requestData) => {
        this.setState({
            price: requestData.price != undefined ? requestData.price : this.state.price,
            discPercent: requestData.discount_in_percentage != undefined ? requestData.discount_in_percentage : this.state.discPercent,
            gstPercent: requestData.gst_in_perecent != undefined ? requestData.gst_in_perecent : this.state.gstPercent,
        }, () => {
            this.calculate()
        })
    }

    calculate = async () => {
        let discounted = ''// this.state.discountedPrice;
        let gst = ''// this.state.gstCharge;
        let final = ''// this.state.finalValue;

        discounted = this.state.price * this.state.discPercent / 100;
        final = this.state.price - discounted + gst;
        gst = final * this.state.gstPercent / 100;
        final = this.state.price - discounted + gst;
        this.setState({
            discountedPrice: discounted,
            gstCharge: gst,
            finalValue: final
        })
    };


    addTheAttribute = async () => {
        console.log('adding the attribute ........   ');
        const { Attributes, attributeTitle, attributeMin, attributePrice, subAttributeItem, subAttributePrice } = this.state;
        if (attributeTitle == '' || attributeMin == '' || attributePrice == '') {
            showErrorToast('Please fill all the attributes field .')
            return;
        }

        let subArray = []
        if (subAttributeItem != '' && subAttributePrice != '') {
            subArray.push({
                itemName: subAttributeItem,
                price: subAttributePrice

            })
        }
        Attributes.push({
            title: attributeTitle,
            price: attributePrice,
            min: attributeMin,
            subAttributes: subArray.length > 0 ? subArray : []
        })
        this.setState({ attributeTitle: '', attributeMin: '', attributePrice: '' })
        this.setState({ subAttributeItem: '', subAttributePrice: '' })

        console.log("List of attributes ===   ", Attributes)

    }

    removeTheAttribute = async (index) => {
        const { Attributes } = this.state;
        Attributes.splice(index, 1);
        this.setState({})
        console.log("after removing .... updated Attributes  ===  ", Attributes)
    }


    addTheSubAttribute = async (index) => {
        const { Attributes, subAttributeItem, subAttributePrice } = this.state;
        if (subAttributeItem == '' || subAttributePrice == '') {
            showErrorToast('Please fill all the sub attributes field .')
            return;
        }
        Attributes[index].subAttributes.push({
            itemName: subAttributeItem,
            price: subAttributePrice

        })
        this.setState({ subAttributeItem: '', subAttributePrice: '' })

        console.log("Attribute after adding sub attribute  ===  ", Attributes)

    }

    removeTheSubAttribute = async (attributeIndex, subAttributeIndex) => {
        const { Attributes, attributeTitle, attributeMin, attributePrice } = this.state;
        Attributes[attributeIndex].subAttributes.splice(subAttributeIndex, 1);
        this.setState({})
        console.log("after removing .... subbbbb Attributes  ===  ", Attributes)
    }




    renderForm = (formProps) => {

        const { handleSubmit, invalid, pristine, submitError } = formProps;
        const { loading, productType } = this.props;
        const submitDisabled = pristine || invalid || loading;
        const submitStyles = this.state.toBeEdit ? styles.submitBtn : submitDisabled ?
            [styles.submitBtn, styles.submitBtnDisabled] : styles.submitBtn;
        const {
            name,
            name_de,
            selectedCusineType,
            cookingTime,
            price,
            discPercent,
            gstPercent,
            finalValue,
            description,
            description_de,
            selectedProductType,
            isRecommended,
            isDineIn,
            isDelivery,
            isTakeAway,
            serverImage,
            toBeAdd,
            toBeEdit,
            discountedPrice,
            gstCharge
        } = this.state

        return (
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding' })}
                style={[styles.topView, { paddingVertical: 0 }]}
            >
                <CommonHeader menuClick={this.menuHandle} title={'Add Product'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center', }}
                    style={[styles.scrollView, { marginVertical: 20, flexGrow: 1 }]}
                >
                    <TouchableOpacity style={{ alignItems: "center", }}
                        onPress={() => {
                            this.setState({ isShowImagePicker: true })
                        }}>
                        <Image
                            style={{ height: DIMENS.pro_img_height, width: DIMENS.pro_img_width, borderRadius: DIMENS.pro_img_redius, borderWidth: 1, borderColor: 'lightgray', backgroundColor: colors.white }}
                            source={this.state.imageData != undefined ? { uri: this.state.imageData.uri } : serverImage != undefined ? { uri: serverImage } : undefined}
                        />
                    </TouchableOpacity>

                    <View style={styles.formControlView}>

                        <Label>{translate('NAME')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="name"
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="'Discount Details"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.nameRef = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            initialValue={name != '' ? name : ''}
                        />
                    </View>
                    <View style={styles.formControlView}>

                        <Label>{translate('NAME_DE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="name_de"
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="'Discount Details"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.nameRef = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            initialValue={name_de != '' ? name_de : ''}
                        />
                    </View>
                    <View style={styles.formControlView}>
                        <Label>{translate('SELECT_CUSINE_TYPE')}</Label>
                        <DropDown
                            onChange={this.selectCusineType}
                            selectedItem={this.state.selectedCusineType}
                            listData={this.state.cusinType != undefined ? this.state.cusinType : []}
                        />
                    </View>
                    <View style={styles.formControlView}>
                        <Label>{translate('COOKING_TIME')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="coocking_time_in_minute"
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="'cookingTime"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.cookingTimeRef = _ref}
                            onSubmitEditing={() => this.priceRef.focus()}
                            keyboardType="numeric"
                            initialValue={cookingTime != '' ? cookingTime + '' : ''}
                        />
                    </View>
                    {/* <TouchableOpacity style={styles.formControlView} onPress={this.AttributeStateUpdate}>
                        <Label>{translate('PRICE')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="price"
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="'price"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.priceRef = _ref}
                            onSubmitEditing={() => this.discountPercentRef.focus()}
                            keyboardType="numeric"
                            initialValue={price != '' ? price + '' : ''}
                        />
                    </TouchableOpacity> */}
                    <View style={styles.formControlView} >
                        <Label>{translate('PRICE')}</Label>
                        <TextInput
                            activeStyle={styles.textInputActive}
                            style={styles.textInput}
                            secureTextEntry={true}
                            onChangeText={(_ref) => this.setState({ priceRef: _ref })}
                            // value={this.state.password}
                            onFocus={this.AttributeStateUpdate}
                            autoCapitalize="none"
                            secureTextEntry={this.state.isPasswordDisable}
                        // onFocus={() => this._foucus("password")}
                        />
                    </View>

                    {this.state.Attributes.length > 0 && this.state.Attributes.map((item, index) => {
                        return (
                            <View style={{ marginVertical: 20, flexGrow: 1, alignItems: 'center', width: '100%' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: DIMENS.px_18, fontWeight: 'bold', paddingRight: 10, paddingLeft: 10 }}>{index + 1}. ATTRIBUTES</Text>
                                    </View>
                                    <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => this.removeTheAttribute(index)}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }}>
                                            -
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.formControlView}>
                                    <Label>Title</Label>
                                    <TextInput
                                        activeStyle={styles.textInputActive}
                                        style={styles.textInput}
                                        secureTextEntry={true}
                                        editable={false}
                                        onChangeText={(text) => console.log("")}
                                        value={item.title}
                                        autoCapitalize="none"
                                        secureTextEntry={this.state.isPasswordDisable}
                                    // onFocus={() => this._foucus("password")}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '50%', }}>
                                        <Label>{translate('PRICE')}</Label>
                                        <TextInput
                                            activeStyle={styles.textInputActive}
                                            style={styles.textInput}
                                            secureTextEntry={true}
                                            editable={false}
                                            onChangeText={(text) => console.log("")}
                                            value={item.price}
                                            autoCapitalize="none"
                                            secureTextEntry={this.state.isPasswordDisable}
                                        // onFocus={() => this._foucus("password")}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '50%', }}>
                                        <Label>Min</Label>
                                        <TextInput
                                            activeStyle={styles.textInputActive}
                                            style={styles.textInput}
                                            secureTextEntry={true}
                                            editable={false}
                                            onChangeText={(text) => console.log("")}
                                            value={item.min}
                                            autoCapitalize="none"
                                            secureTextEntry={this.state.isPasswordDisable}
                                        // onFocus={() => this._foucus("password")}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10 }}>


                                    <Text style={{ fontWeight: 'bold', fontSize: DIMENS.px_12, paddingHorizontal: 15 }}>SUB ATTRIBUTES</Text>

                                    <TouchableOpacity style={{ height: 24, width: 24, borderRadius: 12, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => this.addTheSubAttribute(index)}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 12, marginTop: -3 }}>
                                            +
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                                {item.subAttributes.map((subItem, subIndex) => {
                                    return (
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                                <Label>Item Name</Label>
                                                <TextInput
                                                    activeStyle={styles.textInputActive}
                                                    style={styles.textInput}
                                                    secureTextEntry={true}
                                                    onChangeText={(text) => this.setState({ subAttributeItem: text })}
                                                    value={subItem.itemName}
                                                    autoCapitalize="none"
                                                    secureTextEntry={this.state.isPasswordDisable}
                                                // onFocus={() => this._foucus("password")}
                                                />
                                            </View>
                                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                                <Label>Price</Label>
                                                <TextInput
                                                    activeStyle={styles.textInputActive}
                                                    style={styles.textInput}
                                                    secureTextEntry={true}
                                                    onChangeText={(text) => this.setState({ subAttributePrice: text })}
                                                    value={subItem.price}
                                                    autoCapitalize="none"
                                                    secureTextEntry={this.state.isPasswordDisable}
                                                // onFocus={() => this._foucus("password")}
                                                />
                                            </View>
                                            <View style={{ paddingTop: 40, paddingHorizontal: 16, width: '20%', }}>
                                                <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={this.RemoveNewAttribute}>
                                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }} onPress={() => this.removeTheSubAttribute(index, subIndex)} >
                                                        -
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                        <Label>Item Name</Label>
                                        <TextInput
                                            activeStyle={styles.textInputActive}
                                            style={styles.textInput}
                                            secureTextEntry={true}
                                            onChangeText={(text) => this.setState({ subAttributeItem: text })}
                                            value={this.state.subAttributeItem}
                                            autoCapitalize="none"
                                            secureTextEntry={this.state.isPasswordDisable}
                                        // onFocus={() => this._foucus("password")}
                                        />
                                    </View>
                                    <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                        <Label>Price</Label>
                                        <TextInput
                                            activeStyle={styles.textInputActive}
                                            style={styles.textInput}
                                            secureTextEntry={true}
                                            onChangeText={(text) => this.setState({ subAttributePrice: text })}
                                            value={this.state.subAttributePrice}
                                            autoCapitalize="none"
                                            secureTextEntry={this.state.isPasswordDisable}
                                        // onFocus={() => this._foucus("password")}
                                        />
                                    </View>
                                    <View style={{ paddingTop: 40, paddingHorizontal: 16, width: '20%', }}>
                                        <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => this.addTheSubAttribute(index)}>
                                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }} >
                                                ✓
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={{ paddingTop: 40, paddingHorizontal: 16, width: '20%', }}>
                                        <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={this.RemoveNewAttribute}>
                                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }} >
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </View>

                            </View>
                        )
                    })

                    }

                    <View style={{ marginVertical: 20, flexGrow: 1, alignItems: 'center', width: '100%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ fontSize: DIMENS.px_18, fontWeight: 'bold', paddingRight: 10, paddingLeft: 10 }}>ATTRIBUTES</Text>
                            </View>
                            <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => this.addTheAttribute()}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formControlView}>
                            <Label>Title</Label>
                            <TextInput
                                activeStyle={styles.textInputActive}
                                style={styles.textInput}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ attributeTitle: text })}
                                value={this.state.attributeTitle}
                                autoCapitalize="none"
                                secureTextEntry={this.state.isPasswordDisable}
                            // onFocus={() => this._foucus("password")}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '50%', }}>
                                <Label>{translate('PRICE')}</Label>
                                <TextInput
                                    activeStyle={styles.textInputActive}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ attributePrice: text })}
                                    value={this.state.attributePrice}
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.isPasswordDisable}
                                // onFocus={() => this._foucus("password")}
                                />
                            </View>
                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '50%', }}>
                                <Label>Min</Label>
                                <TextInput
                                    activeStyle={styles.textInputActive}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ attributeMin: text })}
                                    value={this.state.attributeMin}
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.isPasswordDisable}
                                // onFocus={() => this._foucus("password")}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', padding: 10 }}>


                            <Text style={{ fontWeight: 'bold', fontSize: DIMENS.px_12, paddingHorizontal: 15 }}>SUB ATTRIBUTES ( Optional )</Text>

                            {/* <TouchableOpacity style={{ height: 24, width: 24, borderRadius: 12, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => this.addTheSubAttribute(index)}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 12, marginTop: -3 }}>
                                    +
                                </Text>
                            </TouchableOpacity> */}

                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                <Label>Item Name</Label>
                                <TextInput
                                    activeStyle={styles.textInputActive}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ subAttributeItem: text })}
                                    value={this.state.subAttributeItem}
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.isPasswordDisable}
                                // onFocus={() => this._foucus("password")}
                                />
                            </View>
                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                <Label>Price</Label>
                                <TextInput
                                    activeStyle={styles.textInputActive}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ subAttributePrice: text })}
                                    value={this.state.subAttributePrice}
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.isPasswordDisable}
                                // onFocus={() => this._foucus("password")}
                                />
                            </View>
                            {/* <View style={{ paddingTop: 40, paddingHorizontal: 16, width: '20%', }}>
                                <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={this.RemoveNewAttribute}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }} onPress={() => this.addTheSubAttribute(index)} >
                                        ✓
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>

                        <TouchableOpacity style={{ height: 25, borderRadius: 10, width: '20%', backgroundColor: '#c52724', justifyContent: 'center' }} onPress={() => this.addTheAttribute()} >
                            <Text style={{ textAlign: 'center', fontSize: 10, color: 'white' }} >
                                Save Attribute
                            </Text>
                        </TouchableOpacity>


                        {/* <View style={{ flexDirection: 'row', padding: 10 }}>


                            <Text style={{ fontWeight: 'bold', fontSize: DIMENS.px_18, paddingHorizontal: 15 }}>SUB ATTRIBUTES</Text>

                            <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={this.SubAttributeUpdate}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }}>
                                    +
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                <Label>Item Name</Label>
                                <TextInput
                                    activeStyle={styles.textInputActive}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ ItemName: text })}
                                    // value={this.state.password}
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.isPasswordDisable}
                                // onFocus={() => this._foucus("password")}
                                />
                            </View>
                            <View style={{ paddingBottom: 16, paddingHorizontal: 16, width: '40%', }}>
                                <Label>Price</Label>
                                <TextInput
                                    activeStyle={styles.textInputActive}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ SubPrice: text })}
                                    // value={this.state.password}
                                    autoCapitalize="none"
                                    secureTextEntry={this.state.isPasswordDisable}
                                // onFocus={() => this._foucus("password")}
                                />
                            </View>
                            <View style={{ paddingTop: 40, paddingHorizontal: 16, width: '20%', }}>
                                <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: '#c52724', justifyContent: 'center' }} onPress={this.RemoveNewAttribute}>
                                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, marginTop: -3 }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}

                    </View>



                    <View style={styles.formControlView}>
                        <Label>{translate('DISCOUNT_PERCENT')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="discount_in_percentage"
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="discountPercent"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.discountPercentRef = _ref}
                            onSubmitEditing={() => this.gstPercentRef.focus()}
                            keyboardType="numeric"
                            initialValue={discPercent != '' ? discPercent + '' : ''}
                        />
                    </View>
                    <View style={styles.formControlView}>
                        <Label>{translate('GST_PERCENT')}</Label>
                        <Field
                            activeStyle={styles.textInputActive}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            component={FormTextInput}
                            editable={!loading}
                            name="gst_in_perecent"
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="gstPercent"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.gstPercentRef = _ref}
                            onSubmitEditing={() => this.descriptionRef.focus()}
                            keyboardType="numeric"
                            initialValue={gstPercent != '' ? gstPercent + '' : ''}
                        />
                    </View>
                    <View style={styles.formControlView}>
                        <Label>{translate('FINAL_PRICE')}</Label>
                        <Text style={[styles.textInput, {
                            height: DIMENS.final_price_height
                        }]}>
                            {
                                finalValue //!= '' ? finalValue : ''
                            }
                        </Text>
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
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="discription"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.descriptionRef = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            initialValue={description != '' ? description : ''}
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
                            returnKeyType="next"
                            style={styles.textInput}
                            textContentType="discription"
                            underlineColorAndroid={colors.transparent}
                            inputRef={_ref => this.descriptionRef = _ref}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            initialValue={description_de != '' ? description_de : ''}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('SELECT_PRODUCT_TYPE')}</Label>
                        <DropDown
                            onChange={this.selectProductType}
                            selectedItem={this.state.selectedProductType}
                            listData={productType != undefined ? productType : []}
                        />
                    </View>

                    <View style={styles.formControlView}>
                        <Label>{translate('SELECT_SERVICE_TYPE')}</Label>

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
                        <TouchableOpacity onPress={() => this.setState({ isRecommended: !isRecommended })}>
                            <Checkbox checked={isRecommended} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10 }}>{translate('RECOMMENDED')}</Text>
                    </View>
                    {submitError ? (
                        <Label style={{ alignSelf: 'center', color: colors.error }}>
                            {submitError}
                        </Label>
                    ) : null}
                    <CommonSubmitBtn
                        handleSubmit={handleSubmit}
                        submitStyles={submitStyles}
                        submitBtnText={styles.submitBtnText}
                        loading={loading}
                        title={toBeAdd ? translate('SAVE') : translate('UPDATE')}
                    ></CommonSubmitBtn>
                    {
                        this.state.isShowImagePicker &&
                        <CustomImagePicker
                            selectedImageKey={{ key: APP_PARAMS.ADD_PRODUCT_IMAGE, showKeyName: APP_PARAMS.ADD_PRODUCT_IMAGE_SHOW }}
                            isShowImagePicker={this.state.isShowImagePicker}
                            visiblaeChange={this.changeShowImagePicker}>
                        </CustomImagePicker>
                    }
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