import React from 'react'
import {
  Text,
  View, Button, TouchableOpacity,
  Dimensions
} from 'react-native'
import { Form } from 'react-final-form'
import { showError } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import translate from '../../i18n/i18n';
import {
  APP_PARAMS,
} from '../../constants'
//import ImagePicker from 'react-native-image-picker';
import constants from '../../constants/index'
import SignUpInfo from '../../components/Auth/hoocks/SignUpInfo'
import SignUpFoodInfo from './hoocks/SignUpFoodInfo'
import SignUpImageInfo from './hoocks/SignUpImageInfo'
import { showErrorToast, showSuccessToast } from '../../utility/Toast';
import CommonLoader from '../../common/CommonLoader';


// w3c email regex https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
let globalFormProps;
export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      tempCategoryCheckedArray: []
    }
    this.getCountryList();
    this.getCategories();
  }

  editHandle = (key) => {
    this.setState({ [key]: !(this.state[key]) })
  }

  changeShowImagePicker = (isShow, imageObje) => {
    if (imageObje != undefined && imageObje.key != undefined && imageObje.keyValue) {
      let keyName = imageObje.key;
      let showKeyName = imageObje.showKeyName;
      if (this.state[keyName] != undefined && this.state[keyName].length > 0) {
        this.setState({ isShowImagePicker: isShow, [keyName]: [...this.state[keyName], imageObje.keyValue], [showKeyName]: [...this.state[showKeyName], imageObje.keyValueShow] })
      } else {
        this.setState({ isShowImagePicker: isShow, [keyName]: [imageObje.keyValue], [showKeyName]: [imageObje.keyValueShow] })
      }
    } else {
      this.setState({ isShowImagePicker: isShow })
    }
  }

  getImagePath = () => {

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
    this.props.listSignupCategoryApi(dataReq)
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'SignUp',
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
    this.props.navigation.setParams({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}  >
          {this.state.pageFlag > 0 &&
            <View style={{ borderWidth: 1, borderColor: 'white', width: 70, marginRight: 10 }}>
              <Button
                onPress={() => {
                  if (this.state.pageFlag > 0) {
                    this.setState({ pageFlag: (this.state.pageFlag - 1) })
                  }
                  this.props.navigation.setParams({})
                }}
                title={translate("SIGNUP_MY_PROFILE_PREVIOUS")}
                color={colors.primary}
              />
            </View>
          }
          {
            <View style={{ borderWidth: 1, borderColor: 'white', width: 70, marginRight: 10 }}>
              {this.state.pageFlag < 2 ?
                <Button
                  onPress={() => {
                    if (this.state.pageFlag == 0) {
                      this.signUpInfoFormValidate()
                    }
                    else if (this.state.pageFlag == 1) {
                      this.signUpFoodInfoFormValidate()
                    }
                    this.getCategories()
                    this.props.navigation.setParams({})
                  }}
                  title={translate("SIGNUP_MY_PROFILE_NEXT")}
                  color={colors.primary}
                /> : <Button
                  onPress={() => {
                    this.signUpImageInfoFormValidate()
                  }}
                  title={translate("SIGNUP_MY_PROFILE_SAVE")}
                  color={colors.primary}
                />
              }
            </View>
          }
        </View>
      ),
    })
  }

  validate = (values) => {

    // console.log("values::::::::::::::::", JSON.stringify(values));
    let errorMsg = "";
    const errors = []

    if (values.restaurantName) {
      errors.restaurantName = translate('RESTAURANT_NAME_HINT')
      errorMsg = translate('RESTAURANT_NAME_HINT')
    } else if (!/^[a-zA-Z ]+$/.test(values.restaurantName)) {
      errors.restaurantName = translate('RESTAURANT_NAME_HINT')
      errorMsg = translate('RESTAURANT_NAME_HINT')
    } else if (values.email) {
      errors.email = translate('EMAIL_HINT')
      errorMsg = translate('EMAIL_HINT')
    }
    // else if (values.email.indexOf('@') > -1) {
    //   if (!emailRegex.test(values.email)) {
    //     errors.email = translate('EMAIL_HINT')
    //     errorMsg = translate('EMAIL_HINT')
    //   }
    // } 
    else if (!/^[a-zA-Z][\w\-\.]{1,48}\w$/.test(values.email)) {
      errors.email = translate('EMAIL_HINT')
      errorMsg = translate('EMAIL_HINT')
    }
    else if (values.phone) {
      errors.phone = translate('PHONE_HINT')
      errorMsg = translate('PHONE_HINT')
    }
    else if (!/^(0|\+91)?[6789]\d{9}$/.test(values.phone)) {
      errors.phone = translate('PHONE_HINT')
      errorMsg = translate('PHONE_HINT')
    }
    else if (values.addressLine1) {
      errors.addressLine1 = translate('ADDRESS_LINE_1_HINT')
      errorMsg = translate('ADDRESS_LINE_1_HINT')
    }
    else if (values.addressLine1 == '' || values.addressLine1 == undefined) {
      errors.addressLine1 = translate('ADDRESS_LINE_1_HINT')
      errorMsg = translate('ADDRESS_LINE_1_HINT')
    }
    else if (values.zipCode) {
      errors.zipCode = translate('ZIP_CODE_HINT')
      errorMsg = translate('ZIP_CODE_HINT')
    }
    else if (values.zipCode == '' || values.zipCode == undefined) {
      errors.zipCode = translate('ZIP_CODE_HINT')
      errorMsg = translate('ZIP_CODE_HINT')
    }
    else if (!/^[1-9][0-9]{5}$/.test(values.zipCode)) {
      errors.zipCode = translate('ZIP_CODE_HINT')
      errorMsg = translate('ZIP_CODE_HINT')
    }
    else if (values.openingTime) {
      errors.openingTime = translate(' OPENING_TIME_HINT')
    }
    else if (values.openingTime == '' || values.openingTime == undefined) {
      errors.openingTime = translate(' OPENING_TIME_HINT')
    }
    if (values.password) {
      if (!/^(?=.{3,20}$)(?!.*([\s])\1{2})[\w\s]+$/.test(values.password)) {
        errors.password = translate('PASSWORD_HINT')
      }
    } else {
      errors.password = translate('PASSWORD_HINT')
    }
    if (values.confirmPassword) {
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = translate('CONFIRM_PASSWORD_HINT')
      }
    } else {
      errors.confirmPassword = translate('CONFIRM_PASSWORD_HINT')
    }
    return errors
  }

  signUpInfoFormValidate = () => {
    formData = globalFormProps.values;
    if (formData.restaurantName == undefined) {
      showErrorToast(translate('ERROR_SIGNUP_ENTER_RESTRO_NAME'))
    }
    else {
      if (formData.email == undefined) {
        showErrorToast(translate('ERROR_SIGNUP_ENTER_RESTRO_EMAIL'))
      }
      else {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
          showErrorToast(translate('ERROR_SIGNUP_INVAID_RESTRO_EMAIL'))
        }
        else {
          if (formData.phone == undefined) {
            showErrorToast(translate('ERROR_SIGNUP_ENTER_PHONE_NUMBER'))
          }
          else {
            if (formData.phone.toString().length < 10) {
              showErrorToast(translate('ERROR_SIGNUP_INVAID_PHONE_NUMBER'))
            }
            else {
              if (!/^[6-9]\d{9}$/.test(formData.phone)) {
                showErrorToast(translate('ERROR_SIGNUP_INDIAN_PHONE_NUMBER'))

              }

              else {
                if (this.state.selectedCountry == undefined) {
                  showErrorToast(translate('ERROR_SIGNUP_SELECT_COUNTRY'))
                }
                else {
                  if (this.state.selectedState == undefined) {
                    showErrorToast(translate('ERROR_SIGNUP_SELECT_STATE'))
                  }
                  else {
                    if (this.state.selectedCity == undefined) {
                      showErrorToast(translate('ERROR_SIGNUP_SELECT_CITY'))
                    }
                    else {
                      if (this.state.selectedRegion == undefined) {
                        showErrorToast(translate('ERROR_SIGNUP_SELECT_REGION'))
                      }
                      else {
                        if (formData.addressLine1 == undefined) {
                          showErrorToast(translate('ERROR_SIGNUP_ENTER_ADDRESS_ONE'))
                        }
                        else {
                          if (formData.addressLine4 == undefined) {
                            showErrorToast(translate('ERROR_SIGNUP_ENTER_ADDRESS_FOUR'))
                          }
                          else {
                            if (formData.zipCode == undefined) {
                              showErrorToast(translate('ERROR_SIGNUP_ENTER_ZIP_CODE'))
                            }
                            else {
                              if (!/^[1-9][0-9]{5}$/.test(formData.zipCode)) {
                                showErrorToast(translate('ERROR_SIGNUP_INVAID_ZIP_CODE'))
                              }
                              else {
                                if (this.state[APP_PARAMS.OPENING_TIME] == undefined) {
                                  showErrorToast(translate('ERROR_SIGNUP_SELECT_OPENING_TIME'))
                                }
                                else {
                                  if (this.state[APP_PARAMS.CLOSING_TIME] == undefined) {
                                    showErrorToast(translate('ERROR_SIGNUP_SELECT_CLOSING_TIME'))
                                  }
                                  else {
                                    if (formData.password == undefined) {
                                      showErrorToast(translate('ERROR_SIGNUP_ENTER_PASSWORD'))
                                    }
                                    else {
                                      if (formData.password.toString().length <= 5) {

                                        showErrorToast(translate('ERROR_SIGNUP_ENTER_MINIMUM_PASSWORD'))

                                      }

                                      else {
                                        if (formData.confirmPassword == undefined) {
                                          showErrorToast(translate('ERROR_SIGNUP_ENTER_CONFIRM_PASSWORD'))
                                        }
                                        else {
                                          if (formData.confirmPassword != formData.password) {
                                            showErrorToast(translate('ERROR_SIGNUP_PASSWORD_NOT_MATCHED'))
                                          }
                                          else {
                                            if (this.state.pageFlag < 2) {
                                              this.setState({ pageFlag: (this.state.pageFlag + 1) })
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

  signUpFoodInfoFormValidate = () => {
    formData = globalFormProps.values;
    if (formData.costForTwo == undefined) {
      showErrorToast(translate('ERROR_SIGNUP_ENTER_COST_PER_TWO'))
    }
    // else {
    //   if (!/^[1-9][0-9]{1}$/.test(formData.costForTwo)) {
    //     showErrorToast(translate('Price Should Not Start 0 and Price More than 1 Digit'))
    //   }
      else {
        if (this.state.selectedRestroType == undefined) {
          showErrorToast(translate('ERROR_SIGNUP_SELECT_RESTRO_TYPE'))
        }
        else {
          if (this.state.selectedSupportDelivery == undefined) {
            showErrorToast(translate('ERROR_SIGNUP_SELECT_SUPPORT_DELIVERY'))
          }
          else {
            if (this.state.tempCategoryCheckedArray == '') {
              showErrorToast(translate('ERROR_SIGNUP_SELECT_CATEGORIES'))
            }
            else {
              if (this.state.pageFlag < 2) {
                this.setState({ pageFlag: (this.state.pageFlag + 1) })
              }
            }
          }
        }
     // }
    }
  }

  signUpImageInfoFormValidate = () => {
    formData = globalFormProps.values;
    if (this.state[APP_PARAMS.SHOP_LICENCE_IMAGE] == undefined) {
      showErrorToast(translate('ERROR_SIGNUP_SHOP_LICENSE_IMAGE'))
    }
    else {
      if (this.state[APP_PARAMS.FSSAI_LICENCE_IMAGE] == undefined) {
        showErrorToast(translate('ERROR_SIGNUP_SHOP_FAASI_LICENSE_IMAGE'))
      }
      else {
        if (this.state[APP_PARAMS.GSTN_IMAGE] == undefined) {
          showErrorToast(translate('ERROR_SIGNUP_SHOP_GSTN_PAN_IMAGE'))
        }
        else {
          if (this.state[APP_PARAMS.KITCHEN_IMAGE] == undefined) {
            showErrorToast(translate('ERROR_SIGNUP_SHOP_KITCHEN_IMAGE'))
          }
          else {
            if (this.state[APP_PARAMS.BUILDING_FRONT_IMAGE] == undefined) {
              showErrorToast(translate('ERROR_SIGNUP_SHOP_BUILDING_IMAGE'))
            }
            else {
              if (this.state[APP_PARAMS.DINING_PACKAGING_IMAGE] == undefined) {
                showErrorToast(translate('ERROR_SIGNUP_SHOP_DINING_PACKAGING_IMAGE'))
              }
              else {
                if (this.state[APP_PARAMS.LOCALITY_IMAGE] == undefined) {
                  showErrorToast(translate('ERROR_SIGNUP_SHOP_LOCALITY_IMAGE'))
                }
                else {
                  this.submit()
                }
              }
            }
          }
        }
      }
    }
  }

  submit = async () => {

    const { signUpApp } = this.props
    let kitchenImage = [];
    let shopLicenceImage = undefined;
    let FSSAILicenceImage = undefined;
    let GSTImage = undefined;
    let buildingFronImage = [];
    let diningPackagingImage = [];
    let localityImage = [];

    if (this.state[APP_PARAMS.SHOP_LICENCE_IMAGE] != undefined) {
      shopLicenceImage = Object.assign({}, this.state[APP_PARAMS.SHOP_LICENCE_IMAGE][0])
      delete shopLicenceImage.path
    }

    if (this.state[APP_PARAMS.FSSAI_LICENCE_IMAGE] != undefined) {
      FSSAILicenceImage = Object.assign({}, this.state[APP_PARAMS.FSSAI_LICENCE_IMAGE][0])
      delete FSSAILicenceImage.path
    }

    if (this.state[APP_PARAMS.GSTN_IMAGE] != undefined) {
      GSTImage = Object.assign({}, this.state[APP_PARAMS.GSTN_IMAGE][0])
      delete GSTImage.path
    }

    if (this.state[APP_PARAMS.KITCHEN_IMAGE] != undefined) {
      for (let i = 0; i < this.state[APP_PARAMS.KITCHEN_IMAGE].length; i++) {
        let item = Object.assign({}, this.state[APP_PARAMS.KITCHEN_IMAGE][i])
        delete item.path
        kitchenImage.push(item)
      }
    }
    if (this.state[APP_PARAMS.BUILDING_FRONT_IMAGE] != undefined) {
      for (let i = 0; i < this.state[APP_PARAMS.BUILDING_FRONT_IMAGE].length; i++) {
        let item = Object.assign({}, this.state[APP_PARAMS.BUILDING_FRONT_IMAGE][i])
        delete item.path
        buildingFronImage.push(item)
      }
    }
    if (this.state[APP_PARAMS.DINING_PACKAGING_IMAGE] != undefined) {
      for (let i = 0; i < this.state[APP_PARAMS.DINING_PACKAGING_IMAGE].length; i++) {
        let item = Object.assign({}, this.state[APP_PARAMS.DINING_PACKAGING_IMAGE][i])
        delete item.path
        diningPackagingImage.push(item)
      }
    }
    if (this.state[APP_PARAMS.LOCALITY_IMAGE] != undefined) {
      for (let i = 0; i < this.state[APP_PARAMS.LOCALITY_IMAGE].length; i++) {
        let item = Object.assign({}, this.state[APP_PARAMS.LOCALITY_IMAGE][i])
        delete item.path
        localityImage.push(item)
      }
    }
    let newSignup = {};


    newSignup[APP_PARAMS.IMAGE] = buildingFronImage[0]
    newSignup[APP_PARAMS.NAME] = formData.restaurantName != undefined ? formData.restaurantName : ''
    newSignup[APP_PARAMS.EMAIL] = formData.email != undefined ? formData.email : ''
    newSignup[APP_PARAMS.PHONE] = formData.phone != undefined ? formData.phone : ''
    newSignup[APP_PARAMS.ADDRESS] = formData.addressLine1 + formData.addressLine2 + formData.addressLine3 + formData.addressLine4
    newSignup[APP_PARAMS.LANDLINE_NUMBER] = formData.landlineNumber != undefined ? formData.landlineNumber : ''
    newSignup[APP_PARAMS.WEBSITE_LINK] = formData.websiteLink != undefined ? formData.websiteLink : ''
    newSignup[APP_PARAMS.LAT] = '26.888996'
    newSignup[APP_PARAMS.LONG] = '75.804154'
    newSignup[APP_PARAMS.COUNTRY_ID] = this.state.selectedCountry[APP_PARAMS._ID]
    newSignup[APP_PARAMS.STATE_ID] = this.state.selectedState[APP_PARAMS._ID],
    newSignup[APP_PARAMS.CITY_ID] = this.state.selectedCity[APP_PARAMS._ID]
    newSignup[APP_PARAMS.REGION_ID] = this.state.selectedRegion[APP_PARAMS._ID]
    newSignup[APP_PARAMS.ADDRESS_LINE_1] = formData.addressLine1 != undefined ? formData.addressLine1 : ''
    newSignup[APP_PARAMS.ADDRESS_LINE_2] = formData.addressLine2 != undefined ? formData.addressLine2 : ''
    newSignup[APP_PARAMS.ADDRESS_LINE_3] = formData.addressLine3 != undefined ? formData.addressLine3 : ''
    newSignup[APP_PARAMS.ADDRESS_LINE_4] = formData.addressLine4 != undefined ? formData.addressLine4 : ''
    newSignup[APP_PARAMS.ZIP_CODE] = formData.zipCode != undefined ? formData.zipCode : ''

    newSignup[APP_PARAMS.OPENING_TIME] = this.state[APP_PARAMS.OPENING_TIME]
    newSignup[APP_PARAMS.CLOSING_TIME] = this.state[APP_PARAMS.CLOSING_TIME]
    newSignup[APP_PARAMS.PASSWORD] = formData.password
    newSignup[APP_PARAMS.CONFIRM_PASSWORD] = formData.confirmPassword

    newSignup[APP_PARAMS.COST_FOR_TWO] = formData.costForTwo
    newSignup[APP_PARAMS.SELECT_RESTAURANT_TYPE] = this.state.selectedRestroType.name
    newSignup[APP_PARAMS.SUPPORT_DELIVERY] = this.state.selectedSupportDelivery.name
    newSignup[APP_PARAMS.SELECT_CATEGORIES] = this.state.tempCategoryCheckedIDArray

    newSignup[APP_PARAMS.KITCHEN_IMAGE] = kitchenImage
    newSignup[APP_PARAMS.SHOP_LICENCE_IMAGE] = shopLicenceImage
    newSignup[APP_PARAMS.FSSAI_LICENCE_IMAGE] = FSSAILicenceImage
    newSignup[APP_PARAMS.GSTN_IMAGE] = GSTImage
    newSignup[APP_PARAMS.BUILDING_FRONT_IMAGE] = buildingFronImage
    newSignup[APP_PARAMS.DINING_PACKAGING_IMAGE] = diningPackagingImage
    newSignup[APP_PARAMS.LOCALITY_IMAGE] = localityImage

    // console.log("request data:::::::", newSignup);

    signUpApp(newSignup)
      .then(result => {
        if (result.error == false) {
          this.props.navigation.navigate('Login')
        } else {
          alert(result.message)
          //this.checkIfUsernameMatch(username, result.payload.user)
        }
      }
      )
  }

  checkIfUsernameMatch = (username, user) => {
    const { updateUser } = this.props
    const update = user.fullName !== username.trim() ?
      updateUser({ fullName: username, login: user.login }) :
      Promise.resolve()
    update.then(action => {
      if (action && action.error) {
        showError('Failed to update user', action.error)
      } else {
        //    this.connectAndRedirect()
      }
    })
  }

  connectAndRedirect = () => {
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

  renderForm2 = (formProps) => {
    const { invalid, pristine, handleSubmit } = formProps
    globalFormProps = formProps
    const { loading, country, listSignupCategories } = this.props
    const submitDisabled = pristine || invalid || loading
    return (
      <View style={{ flex: 1 }}>

        {this.state.pageFlag === 0 &&
          <SignUpInfo
            formProps={formProps}
            thisProps={this.props}
            selectedCountry={this.state.selectedCountry}
            selectedState={this.state.selectedState}
            selectedCity={this.state.selectedCity}
            selectedRegion={this.state.selectedRegion}
            openingDatePick={this.openingDatePick}
            closingDatePick={this.closingDatePick}
            countryPicker={this.countryPicker}
            statePicker={this.statePicker}
            cityPicker={this.cityPicker}
            regionPicker={this.regionPicker}
            country={this.props.country != undefined && this.props.country != undefined && this.props.country}
            stateData={this.props.stateData != undefined && this.props.stateData != undefined && this.props.stateData}
            city={this.props.city != undefined && this.props.city != undefined && this.props.city}
            region={this.props.region != undefined && this.props.region != undefined && this.props.region}
            handleSubmit={this.signUpInfoFormValidate}
            type={'signup'}
          ></SignUpInfo>
        }
        {
          this.state.pageFlag === 1 &&
          <SignUpFoodInfo
            allState={this}
            formProps={formProps}
            thisProps={this.props}
            restroType={this.state.restroType}
            supportDelivery={this.state.supportDelivery}
            category={listSignupCategories != undefined && listSignupCategories}
            selectedRestroType={this.state.selectedRestroType}
            selectedSupportDelivery={this.state.selectedSupportDelivery}
            selectedCategory={this.state.selectedCategory}
            restroTypePicker={this.restroTypePicker}
            supportDeliveryPicker={this.supportDeliveryPicker}
            showCategorySelectorModal={this.state.showCategorySelectorModal}
            showCategoryModal={this.showCategoryModal}
            closeCategoryModal={this.closeCategoryModal}
            tempCategoryCheckedArray={this.state.tempCategoryCheckedArray}
            handleSubmit={this.signUpFoodInfoFormValidate}
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
        <CommonLoader modalVisible={loading}></CommonLoader>
      </View>
    )
  }

  render() {
    return (
      <Form
        onSubmit={this.submit}
        render={this.renderForm2}
      //validate={this.validate}
      />
    )
  }

}