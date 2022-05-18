import React from 'react';
import {
    DIMENS,
    APP_PARAMS,
    DATE_FORMAT
} from '../../constants'
import {
    View,
    Text,
    Button, TouchableOpacity,Alert
} from 'react-native';
import { Form } from 'react-final-form'
import CommonHeader from '../../common/CommonHeader';
import SignUpInfo from '../../components/Auth/hoocks/SignUpInfo'
import SignUpFoodInfo from './hoocks/SignUpFoodInfo'
import SignUpImageInfo from './hoocks/SignUpImageInfo'
import { colors } from '../../theme'
import translate from '../../i18n/i18n';
import MyProfileHeader from '../../common/MyProfileHeader';
import { showError } from '../../NotificationService';
import * as utils from '../../utility/Utils';
import I18n from '../../i18n/i18n';
import { setLocale } from '../../i18n/i18n';
import  {setCurrentLanguage} from '../../../src/thunks/UserPreferences'

export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeLanguage: 'english',
            openingTimeShow: '',
            pageFlag: 0,
            [APP_PARAMS.OPENING_TIME]: undefined,
            [APP_PARAMS.CLOSING_TIME]: undefined,
            selectedCountry: undefined,
            selectedState: undefined,
            selectedCity: undefined,
            selectedRegion: undefined,
            isShowImagePicker: false,

            [APP_PARAMS.SHOP_LICENCE_IMAGE]: undefined,
            [APP_PARAMS.SHOP_LICENCE_IMAGE_SHOW]: undefined,
            [APP_PARAMS.SHOP_LICENCE_IMAGE_EDIT]: false,

            [APP_PARAMS.FSSAI_LICENCE_IMAGE]: undefined,
            [APP_PARAMS.FSSAI_LICENCE_IMAGE_SHOW]: undefined,
            [APP_PARAMS.FSSAI_LICENCE_IMAGE_EDIT]: false,

            [APP_PARAMS.GSTN_IMAGE]: undefined,
            [APP_PARAMS.GSTN_IMAGE_SHOW]: undefined,
            [APP_PARAMS.GSTN_IMAGE_EDIT]: false,

            [APP_PARAMS.KITCHEN_IMAGE]: undefined,
            [APP_PARAMS.KITCHEN_IMAGE_SHOW]: undefined,
            [APP_PARAMS.KITCHEN_IMAGE_EDIT]: false,

            [APP_PARAMS.BUILDING_FRONT_IMAGE]: undefined,
            [APP_PARAMS.BUILDING_FRONT_IMAGE_SHOW]: undefined,
            [APP_PARAMS.BUILDING_FRONT_IMAGE_EDIT]: false,

            [APP_PARAMS.DINING_PACKAGING_IMAGE]: undefined,
            [APP_PARAMS.DINING_PACKAGING_IMAGE_SHOW]: undefined,
            [APP_PARAMS.DINING_PACKAGING_IMAGE_EDIT]: false,

            [APP_PARAMS.LOCALITY_IMAGE]: undefined,
            [APP_PARAMS.LOCALITY_IMAGE_SHOW]: undefined,
            [APP_PARAMS.LOCALITY_IMAGE_EDIT]: false,

            restroType: [
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
                },
                {
                    label: "Veg And Non-Veg",
                    name: "veg_non_veg"
                }
            ],
            selectedRestroType: undefined,
            supportDelivery: [
                {
                    name: APP_PARAMS.SELECT_ITEM,
                    label: APP_PARAMS.SELECT_ITEM
                },
                {
                    label: "True",
                    name: "true"
                },
                {
                    label: "False",
                    name: "false"
                }
            ],
            selectedSupportDelivery: undefined,
            showCategorySelectorModal: false,
            tempCategoryCheckedArray: [],
            tempCategoryCheckedIDArray: [],
        }
        //this.getCountryList();
        this.getCategories();
        this.getUserData()
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'My Profile',
        headerStyle: {
            backgroundColor: colors.primary,
        },
        headerRight: navigation.state.params && navigation.state.params.headerRight,
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })

    componentDidMount() {
        //this.getUserData()

    }

    getUserData = async () => {
        const { myProfileApi } = this.props
        let reqdata = {
            [APP_PARAMS._ID]: global[APP_PARAMS.USER_DATA][APP_PARAMS.USER_ID]
        }
        myProfileApi(reqdata).then(() => {
            this.getServerRestroType()
            this.getServerSupportDelivery()
            this.getImageDataFromServer()
            this.getServerCategories()
            this.setState({
                [APP_PARAMS.SHOP_LICENCE_IMAGE]: this.props.myProfile != undefined ? [{ name: this.props.myProfile.data.restro_detail.shop_licence_img }] : undefined,
                [APP_PARAMS.SHOP_LICENCE_IMAGE_SHOW]: this.props.myProfile != undefined ? [this.props.myProfile.data.restro_detail.shop_licence_img] : undefined,
                [APP_PARAMS.SHOP_LICENCE_IMAGE_EDIT]: false,

                [APP_PARAMS.FSSAI_LICENCE_IMAGE]: this.props.myProfile != undefined ? [{ name: this.props.myProfile.data.restro_detail.fssai_licence_img }] : undefined,
                [APP_PARAMS.FSSAI_LICENCE_IMAGE_SHOW]: this.props.myProfile != undefined ? [this.props.myProfile.data.restro_detail.fssai_licence_img] : undefined,
                [APP_PARAMS.FSSAI_LICENCE_IMAGE_EDIT]: false,

                [APP_PARAMS.GSTN_IMAGE]: this.props.myProfile != undefined ? [{ name: this.props.myProfile.data.restro_detail.gstn_or_pan_img }] : undefined,
                [APP_PARAMS.GSTN_IMAGE_SHOW]: this.props.myProfile != undefined ? [this.props.myProfile.data.restro_detail.gstn_or_pan_img] : undefined,
                [APP_PARAMS.GSTN_IMAGE_EDIT]: false,

                [APP_PARAMS.KITCHEN_IMAGE]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.kitchen_img : undefined,
                [APP_PARAMS.KITCHEN_IMAGE_SHOW]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.kitchen_img : undefined,
                [APP_PARAMS.KITCHEN_IMAGE_EDIT]: false,

                [APP_PARAMS.BUILDING_FRONT_IMAGE]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.building_front_img : undefined,
                [APP_PARAMS.BUILDING_FRONT_IMAGE_SHOW]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.building_front_img : undefined,
                [APP_PARAMS.BUILDING_FRONT_IMAGE_EDIT]: false,

                [APP_PARAMS.DINING_PACKAGING_IMAGE]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.dining_packaging_img : undefined,
                [APP_PARAMS.DINING_PACKAGING_IMAGE_SHOW]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.dining_packaging_img : undefined,
                [APP_PARAMS.DINING_PACKAGING_IMAGE_EDIT]: false,

                [APP_PARAMS.LOCALITY_IMAGE]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.locality_image : undefined,
                [APP_PARAMS.LOCALITY_IMAGE_SHOW]: this.props.myProfile != undefined ? this.props.myProfile.data.restro_detail.locality_image : undefined,
                [APP_PARAMS.LOCALITY_IMAGE_EDIT]: false,
            })
        })
    }

    menuHandle = () => {
        const isDraweOpen = this.props.navigation.state.isDraweOpen
        if (isDraweOpen) {
            this.props.navigation.closeDrawer()
        } else {
            this.props.navigation.openDrawer()
        }
    }

    submit = async () => {

    }

    changeShowImagePicker = (isShow, imageObje) => {
        if (imageObje != undefined && imageObje.key != undefined && imageObje.keyValue) {
            let keyName = imageObje.key;
            let showKeyName = imageObje.showKeyName;
            if (this.state[keyName] != undefined &&
                this.state[keyName].length > 0 &&
                keyName != APP_PARAMS.SHOP_LICENCE_IMAGE &&
                keyName != APP_PARAMS.FSSAI_LICENCE_IMAGE &&
                keyName != APP_PARAMS.GSTN_IMAGE) {
                this.setState({
                    isShowImagePicker: isShow, [keyName]: [...this.state[keyName], imageObje.keyValue],
                    [showKeyName]: [...this.state[showKeyName], imageObje.keyValueShow]
                })
            } else {
                this.setState({ isShowImagePicker: isShow, [keyName]: [imageObje.keyValue], [showKeyName]: [imageObje.keyValueShow] })
            }
        } else {
            this.setState({ isShowImagePicker: isShow })
        }
    }

    increasePageFlag = () => {
        this.setState({ pageFlag: (this.state.pageFlag + 1) })
    }

    decreasePageFlag = () => {
        this.setState({ pageFlag: (this.state.pageFlag - 1) })
    }


    getCountryList = () => {
        let dataReq = {
            [APP_PARAMS.USERID]: global[APP_PARAMS.USER_DATA] != undefined ? global[APP_PARAMS.USER_DATA][APP_PARAMS.USERID] : '0'
        }
        this.props.countryList(dataReq)
    }

    getStateList = () => {
        if (this.state.selectedCountry != undefined) {
            let dataReq = {
                [APP_PARAMS.COUNTRY_ID]: this.state.selectedCountry[APP_PARAMS._ID]
            }
            this.props.stateList(dataReq)
        }
    }

    getCityList = () => {
        if (this.state.selectedState != undefined) {
            let dataReq = {
                [APP_PARAMS.COUNTRY_ID]: this.state.selectedCountry[APP_PARAMS._ID],
                [APP_PARAMS.STATE_ID]: this.state.selectedState[APP_PARAMS._ID]
            }
            this.props.cityList(dataReq)
        }
    }

    getRegionList = () => {
        if (this.state.selectedCity != undefined) {
            let dataReq = {
                [APP_PARAMS.COUNTRY_ID]: this.state.selectedCountry[APP_PARAMS._ID],
                [APP_PARAMS.STATE_ID]: this.state.selectedState[APP_PARAMS._ID],
                [APP_PARAMS.CITY_ID]: this.state.selectedCity[APP_PARAMS._ID]
            }
            this.props.regionList(dataReq)
        }
    }

    clearAllLocation = () => {
        this.props.stateClearList();
        this.props.cityClearList();
        this.props.regionClearList();
    }

    clearTwoLocation = () => {
        this.props.cityClearList();
        this.props.regionClearList();
    }

    countryPicker = (item, index) => {
        if (this.props.country != undefined) {
            this.clearAllLocation();
            this.setState({
                selectedCountry: (item !== APP_PARAMS.SELECT_ITEM) ? this.props.country[index] : undefined, selectedState: undefined,
                selectedCity: undefined, selectedRegion: undefined
            }, () => {
                (item !== APP_PARAMS.SELECT_ITEM) && this.getStateList();
            })
        }
    }

    statePicker = (item, index) => {
        if (this.props.stateData != undefined) {
            this.clearTwoLocation();
            this.setState({
                selectedState: (item !== APP_PARAMS.SELECT_ITEM) ? this.props.stateData[index] : undefined, selectedCity: undefined, selectedRegion: undefined
            }, () => {
                (item !== APP_PARAMS.SELECT_ITEM) && this.getCityList();
            })
        }
    }

    cityPicker = (item, index) => {
        if (this.props.city != undefined) {
            this.props.regionClearList();
            this.setState({ selectedCity: (item !== APP_PARAMS.SELECT_ITEM) ? this.props.city[index] : undefined, selectedRegion: undefined }, () => {
                (item !== APP_PARAMS.SELECT_ITEM) && this.getRegionList();
            })
        }
    }

    regionPicker = (item, index) => {
        if (this.props.region != undefined) {
            this.setState({ selectedRegion: (item !== APP_PARAMS.SELECT_ITEM) ? this.props.region[index] : undefined })
        }
    }

    openingDatePick = (date) => {
        this.setState({ [APP_PARAMS.OPENING_TIME]: date }, () => console.log("date:::::::::::::", this.state[APP_PARAMS.OPENING_TIME]))
    }

    closingDatePick = (date) => {
        this.setState({ [APP_PARAMS.CLOSING_TIME]: date }, () => console.log("date:::::::::::::", this.state[APP_PARAMS.CLOSING_TIME]))
    }

    restroTypePicker = (item, index) => {
        this.setState({
            selectedRestroType: (item !== APP_PARAMS.SELECT_ITEM) ? this.state.restroType[index] : undefined,
        })
    }

    supportDeliveryPicker = (item, index) => {
        this.setState({
            selectedSupportDelivery: (item !== APP_PARAMS.SELECT_ITEM) ? this.state.supportDelivery[index] : undefined,
        })
    }

    getCategories = () => {
        let dataReq = {}
        this.props.listSignupCategoryApi(dataReq).then(res => {
            if (res != undefined) {
                this.getServerCategories()
            }
        })
    }

    showCategoryModal = () => {
        this.setState({
            showCategorySelectorModal: true
        })
    }

    closeCategoryModal = () => {
        this.setState({
            showCategorySelectorModal: false
        })
    }

    onChangeCheckBox = async (item, index) => {
        item.isChecked = item.isChecked == undefined ? true : !item.isChecked
        this.props.listSignupCategories.slice(1, item)
        this.setTempArray(item)
    }

    setTempArray = (item) => {
        let array = []
        let categoryIDs = []
        for (let i = 0; i < this.props.listSignupCategories.length; i++) {
            if (this.props.listSignupCategories[i].isChecked == true) {
                array.push(this.props.listSignupCategories[i].label)
                categoryIDs.push(this.props.listSignupCategories[i]._id)
            }
        }
        this.setState({
            tempCategoryCheckedArray: array,
            tempCategoryCheckedIDArray: categoryIDs
        })
    }

    getServerRestroType = async () => {
        let restroType = utils.getRestroType(
            this.props.myProfile.data.restro_detail.restaurent_type,
            this.state.restroType
        )
        this.setState({
            selectedRestroType: restroType
        })
    }

    getServerSupportDelivery = async () => {
        let supportDelivery = utils.getSupportDelivery(
            this.props.myProfile.data.restro_detail.support_delivery,
            this.state.supportDelivery
        )
        this.setState({
            selectedSupportDelivery: supportDelivery
        })
    }

    getServerCategories = async () => {
        let restroCategory = utils.getCategoryName(
            this.props.myProfile.data.restro_detail.categories,
            this.props.listSignupCategories
        )
        this.setState({
            tempCategoryCheckedArray: restroCategory
        })
    }

    getImageDataFromServer = async () => {
        shopLicenceImage = undefined
        shopLicenceImageShow = []

        if (this.props.myProfile != undefined) {
            shopLicenceImage = [this.props.myProfile.data.restro_detail.shop_licence_img]
        }
    }

    renderForm2 = (formProps) => {
        const { invalid, pristine, handleSubmit } = formProps
        globalFormProps = formProps
        const { loading, myProfile, listSignupCategories } = this.props
        const submitDisabled = pristine || invalid || loading
        // alert(JSON.stringify(listSignupCategories))
        //console.warn("myProfile:::::", myProfile)
        return (
            <View style={{ flex: 1 }}>
                <MyProfileHeader
                    menuClick={this.menuHandle}
                    title={'My Profile'}
                    increasePageFlag={this.increasePageFlag}
                    decreasePageFlag={this.decreasePageFlag}
                    pageFlag={this.state.pageFlag}
                />
                {this.state.pageFlag === 0 &&
                    <SignUpInfo
                        allState={this}
                        formProps={formProps}
                        thisProps={this.props}

                        country={this.props.country != undefined && this.props.country}
                        selectedCountry={this.state.selectedCountry}
                        countryPicker={this.countryPicker}

                        stateData={this.props.stateData != undefined && this.props.stateData}
                        selectedState={this.state.selectedState}
                        statePicker={this.statePicker}

                        city={this.props.city != undefined && this.props.city}
                        selectedCity={this.state.selectedCity}
                        cityPicker={this.cityPicker}

                        region={this.props.region != undefined && this.props.region}
                        selectedRegion={this.state.selectedRegion}
                        regionPicker={this.regionPicker}

                        openingDatePick={this.openingDatePick}
                        closingDatePick={this.closingDatePick}

                        handleSubmit={this.signUpInfoFormValidate}
                        myProfile={myProfile}

                        type={'myprofile'}
                    ></SignUpInfo>
                }
                {this.state.pageFlag === 1 &&
                    <SignUpFoodInfo
                        allState={this}
                        formProps={formProps}
                        thisProps={this.props}

                        restroType={this.state.restroType}
                        selectedRestroType={this.state.selectedRestroType != undefined ? this.state.selectedRestroType : undefined}
                        restroTypePicker={this.restroTypePicker}

                        supportDelivery={this.state.supportDelivery}
                        selectedSupportDelivery={this.state.selectedSupportDelivery}
                        supportDeliveryPicker={this.supportDeliveryPicker}

                        category={listSignupCategories != undefined && listSignupCategories}
                        selectedCategory={this.state.selectedCategory}
                        showCategorySelectorModal={this.state.showCategorySelectorModal}
                        showCategoryModal={this.showCategoryModal}
                        closeCategoryModal={this.closeCategoryModal}
                        tempCategoryCheckedArray={this.state.tempCategoryCheckedArray}

                        handleSubmit={this.signUpFoodInfoFormValidate}
                        myProfile={myProfile}
                    ></SignUpFoodInfo>
                }
                {this.state.pageFlag === 2 &&
                    <SignUpImageInfo
                        allState={this}
                        formProps={formProps}
                        thisProps={this.props}
                        isShowImagePicker={this.state.isShowImagePicker}
                        visiblaeChange={this.changeShowImagePicker}
                        editHandle={this.editHandle}
                    >
                    </SignUpImageInfo>
                }
                {/* <CommonLoader modalVisible={loading}></CommonLoader> */}
            </View>
        )
    }

    render() {
        return (
            <Form
                onSubmit={this.submit}
                render={this.renderForm2}
            validate={this.validate}
            />

    //         <View>
    //     <Text>{translate('Gargi')}</Text>
    // <TouchableOpacity
    //     // style={styles.button}
    //     onPress={() => {
    //       Alert.alert(
    //         'Language Selection',
    //         'Multi language support',
    //         [
            //   {
            //     text: 'French',
            //     lang : 'en',
            //     onPress: () => {
            //         // setLocale(lang);
            //         setCurrentLanguage(lang);
            //     //   I18n.locale = 'fr-Us';
            //       this.setState({changeLanguage: 'English'});
            //     },
            //   },
    //           {
    //             text: 'English',
    //             onPress: () => {
    //                 let lang = 'en';
    //                 console.warn("lang value.......",lang);
    //                 setLocale(lang);
    //             //   I18n.locale = 'en-Us';
    //               this.setState({changeLanguage: 'English'});
    //             },
    //           },
    //           {
    //             text: 'Hindi',
    //             onPress: () => {
    //                 let lang = 'hi';
    //                 console.warn("lang value.......",lang);
    //                 setLocale(lang);
    //                 // setCurrentLanguage(lang);
    //             //   I18n.locale = 'hi';
    //               this.setState({changeLanguage: 'Hindi'});
    //             },
    //           },
    //           {
    //             text: 'Cancel',
    //             onPress: () => {
    //               console.log('Cancel Pressed');
    //             },
    //             style: 'cancel',
    //           },
    //         ],
    //         {cancelable: false},
    //       );
    //     }}>
    //     <Text>Click Change Language</Text>
    //   </TouchableOpacity>
    // </View>
        )
    }
}