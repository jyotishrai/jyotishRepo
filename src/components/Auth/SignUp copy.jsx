import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View, Image, Button, Picker
} from 'react-native'
import { Form, Field } from 'react-final-form'


import FormTextInput from '../FormTextInput'
import HeaderButton from '../HeaderButton'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import {
  APP_PARAMS,
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'






import DropDown from '../DropDown';
import CommonTimePiker from '../CommonTimePiker';

//import firebase from 'firebase';
//import firebase, { firestore } from '../../firebase/Firebase';

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

// w3c email regex https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/



export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      openingTimeShow: ''

    }
  }


  static navigationOptions = ({ navigation }) => ({
    title: 'SignUp',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <Button
          onPress={() => alert('This is a button!')}
          title="Next"
          color={colors.primary}
          marginRight={10}
        />
      </View>
    ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  })




  validate = (values) => {
    const errors = []

    if (values.email) {
      if (values.email.indexOf('@') > -1) {
        if (!emailRegex.test(values.email)) {
          errors.email = translate('EMAIL_HINT')
        }
      } else {
        if (!/^[a-zA-Z][\w\-\.]{1,48}\w$/.test(values.email)) {
          errors.email = translate('EMAIL_HINT')
        }
      }
    } else {
      errors.email = translate('EMAIL_HINT')
    }



    if (values.restaurantName) {
      if (!/^[a-zA-Z ]+$/.test(values.restaurantName)) {
        errors.restaurantName = translate('RESTAURANT_NAME_HINT')
      }
    } else {
      errors.restaurantName = translate('RESTAURANT_NAME_HINT')
    }



    if (values.phone) {
      if (!/^(0|\+91)?[6789]\d{9}$/.test(values.phone)) {
        errors.phone = translate('PHONE_HINT')

      }
    } else {
      errors.phone = translate('PHONE_HINT')
    }




    if (values.landlineNumber) {
      if (!/^[0-9]\d{2,4}-\d{6,8}$/.test(values.landlineNumber)) {
        errors.landlineNumber = translate('LANDLINE_NUMBER_HINT')

      }
    } else {
      errors.landlineNumber = translate('LANDLINE_NUMBER_HINT')
    }

    // if (values.selectCountry) {
    //   if (values.selectCountry == '') {
    //     errors.selectCountry = translate('SELECT_COUNTRY_HINT')

    //   }
    // } else {
    //   errors.selectCountry = translate('SELECT_COUNTRY_HINT')
    // }


    if (values.addressLine1) {
      if (values.addressLine1 == '' || values.addressLine1 == undefined) {
        errors.addressLine1 = translate('ADDRESS_LINE_1_HINT')
      }
    } else {
      errors.addressLine1 = translate('ADDRESS_LINE_1_HINT')

    }



    if (values.addressLine4) {
      if (values.addressLine4 == '' || values.addressLine4 == undefined) {
        errors.addressLine4 = translate('ADDRESS_LINE_4_HINT')
      }
    } else {
      errors.addressLine4 = translate('ADDRESS_LINE_4_HINT')

    }

    if (values.zipCode) {
      if (values.zipCode == '' || values.zipCode == undefined) {
        errors.zipCode = translate('ZIP_CODE_HINT')
      }
      else if (!/^[1-9][0-9]{5}$/.test(values.zipCode)) {
        errors.zipCode = translate('ZIP_CODE_HINT')

      }



    } else {
      errors.zipCode = translate('ZIP_CODE_HINT')
    }




    if (values.openingTime) {
      if (values.openingTime == '' || values.openingTime == undefined) {
        errors.openingTime = translate(' OPENING_TIME_HINT')
      }
    } else {
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

  submit = async (requestField, username) => {

    const { createUser, signIn, signUpAppUser } = this.props
    let newLogin = { [APP_PARAMS.ROLE]: APP_PARAMS.SUPER_ADMIN };
    newLogin[APP_PARAMS.EMAIL] = requestField.email
    newLogin[APP_PARAMS.PASSWORD] = requestField.password
    newLogin[APP_PARAMS.CONFIRM_PASSWORD] = requestField.confirmPassword
    newLogin[APP_PARAMS.RESTAURANT_NAME] = requestField.restaurantName
    newLogin[APP_PARAMS.PHONE] = requestField.phone
    newLogin[APP_PARAMS.LANDLINE_NUMBER] = requestField.landlineNumber
    newLogin[APP_PARAMS.WEBSITE_LINK] = requestField.websiteLink
    newLogin[APP_PARAMS.MAP] = requestField.map
    newLogin[APP_PARAMS.SELECT_COUNTRY] = requestField.selectCountry
    newLogin[APP_PARAMS.SELECT_STATE] = requestField.selectState
    newLogin[APP_PARAMS.SELECT_CITY] = requestField.selectCity
    newLogin[APP_PARAMS.SELECT_REGION] = requestField.selectRegion
    newLogin[APP_PARAMS.ADDRESS_LINE_1] = requestField.addressLine1
    newLogin[APP_PARAMS.ADDRESS_LINE_2] = requestField.addressLine2
    newLogin[APP_PARAMS.ADDRESS_LINE_3] = requestField.addressLine3
    newLogin[APP_PARAMS.ADDRESS_LINE_4] = requestField.addressLine4
    newLogin[APP_PARAMS.ZIP_CODE] = requestField.zipCode
    newLogin[APP_PARAMS.OPENING_TIME] = requestField.openingTime
    newLogin[APP_PARAMS.CLOSING_TIME] = requestField.closingTime
    newLogin[APP_PARAMS.COST_FOR_TWo] = requestField.costForTwo
    newLogin[APP_PARAMS.SELECT_RESTAURANT_TYPE] = requestField.selectRestaurantType
    newLogin[APP_PARAMS.SUPPORT_DELIVERY] = requestField.supportDelivery
    newLogin[APP_PARAMS.SELECT_CATEGORIES] = requestField.selectCategories
    newLogin[APP_PARAMS.KITCHEN_IMAGE] = requestField.kitchenImage
    newLogin[APP_PARAMS.SHOP_LICENCE_IMAGE] = requestField.shopLicenseImage
    newLogin[APP_PARAMS.FSSAI_LICENCE_IMAGE] = requestField.fssaiLicenceImage
    newLogin[APP_PARAMS.GSTN_IMAGE] = requestField.gstnImage
    newLogin[APP_PARAMS.BUILDING_FRONT_IMAGE] = requestField.buildingFrontImage
    newLogin[APP_PARAMS.DINING_PACKAGING_IMAGE] = requestField.diningPackagingImage
    newLogin[APP_PARAMS.LOCALITY_IMAGE] = requestField.localityImage

    // console.log("request data:::::::", newLogin);

    signUpAppUser(newLogin)
      .then(result => {
        //console.log("result:::::::::::::::::::::::::::::::::::::::::::::::", result);
        if (result && result.error) {
        } else {
          //  this.checkIfUsernameMatch(username, result.payload.user)
        }
      }
      )

    // signIn({ login }).then(result => {
    //   if (result && result.error) {
    //     if (result.error.toLowerCase().indexOf('unauthorized') > -1) {
    //       createUser({
    //         fullName: username.trim(),
    //         login: login.trim(),
    //         password: 'quickblox',
    //       }).then(userCreateAction => {
    //         if (userCreateAction && userCreateAction.error) {
    //           showError(
    //             'Failed to create user account',
    //             userCreateAction.error
    //           )
    //         } else {
    //           this.submit({ login, username })
    //         }
    //       })
    //     } else {
    //       showError('Failed to sign in', result.error)
    //     }
    //   } else {
    //     this.checkIfUsernameMatch(username, result.payload.user)
    //   }
    // })

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





  renderForm = (formProps) => {


    const { handleSubmit, invalid, pristine, submitError } = formProps
    const { loading } = this.props
    const submitDisabled = pristine || invalid || loading
    const submitStyles = submitDisabled ?
      [styles.submitBtn, styles.submitBtnDisabled] :
      styles.submitBtn


    return (
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={[styles.topView, { paddingVertical: 20 }]}
      >

        {/* <CommonHeader/> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          style={[styles.scrollView, { maginVertical: 0 }]}
        >
          {/* <Image source={images.LOGO} style={{ resizeMode: 'center', }}></Image> */}

          <Label>{translate('RESTAURANT_INFORMATION')}</Label>



          <View style={styles.formControlView}>
            <Label>{translate('RESTAURANT_NAME')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="restaurantName"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="restaurantName"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('Email')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="email"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="email"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('PHONE')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="phone"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="phone"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('LANDLINE_NUMBER')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="landlineNumber"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="landlineNumber"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('WEBSITE_LINK')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="websiteLink"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="websiteLink"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('MAP')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="Map"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="map"
              underlineColorAndroid={colors.transparent}
            />
          </View>


          <View style={styles.formControlView}>

            <Label>{translate('SELECT_COUNTRY')}</Label>

            <DropDown />
          </View>


          <View style={styles.formControlView}>

            <Label>{translate('SELECT_STATE')}</Label>

            <DropDown />
          </View>



          <View style={styles.formControlView}>

            <Label>{translate('SELECT_CITY')}</Label>

            <DropDown />
          </View>

          <View style={styles.formControlView}>

            <Label>{translate('SELECT_REGION')}</Label>

            <DropDown />
          </View>


          <View style={styles.formControlView}>
            <Label>{translate('ADDRESS_LINE_1')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="addressLine1"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="addressLine1"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('ADDRESS_LINE_2')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="Address line 2"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="map"
              underlineColorAndroid={colors.transparent}
            />
          </View>


          <View style={styles.formControlView}>
            <Label>{translate('ADDRESS_LINE_3')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="address line 3"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="map"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('ADDRESS_LINE_4')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="addressLine4"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="addressLine4"
              underlineColorAndroid={colors.transparent}
            />
          </View>




          <View style={styles.formControlView}>
            <Label>{translate('ZIP_CODE')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="zipCode"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="Zipcode"
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView} style={{ flexDirection: 'row', }} >

            <View >

              <Label>{this.state.openingTimeShow == '' ? translate('OPENING_TIME') : null}</Label>


              <CommonTimePiker
                onClick={(text) => {
                  this.setState({ openingTimeShow: text })
                  // console.log('dvbfjsdk', text)
                }} />
            </View>
            <View style={{ marginLeft: 20, }}>

              <Label>{translate('CLOSING_TIME')}</Label>
              <CommonTimePiker />
            </View>




          </View>



          {/* <View style={styles.formControlView}  >

            <Label>{translate('CLOSING_TIME')}</Label>




          </View> */}








          <View style={styles.formControlView}>
            <Label>{translate('Password')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              component={FormTextInput}
              editable={!loading}
              inputRef={_ref => this.usernameRef = _ref}
              name="password"
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              style={styles.textInput}
              underlineColorAndroid={colors.transparent}
            />
          </View>



          <View style={styles.formControlView}>
            <Label>{translate('CONFIRM_PASSWORD')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              component={FormTextInput}
              editable={!loading}
              inputRef={_ref => this.usernameRef = _ref}
              name="confirmPassword"
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              style={styles.textInput}
              underlineColorAndroid={colors.transparent}
            />
          </View>


          <Label>{translate('FOOD_INFORMATION')}</Label>


          <View style={styles.formControlView}>
            <Label>{translate('COST_FOR_TWO')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              blurOnSubmit={false}
              component={FormTextInput}
              editable={!loading}
              name="costForTwo"
              onSubmitEditing={() => this.usernameRef.focus()}
              returnKeyType="next"
              style={styles.textInput}
              textContentType="CostForTwo"
              underlineColorAndroid={colors.transparent}
            />
          </View>


          <View style={styles.formControlView}>

            <Label>{translate('SELECT_RESTAURANT_TYPE')}</Label>

            <DropDown />
          </View>

          <View style={styles.formControlView}>

            <Label>{translate('SUPPORT_DELIVERY')}</Label>

            <DropDown />
          </View>


          <View style={styles.formControlView}>

            <Label>{translate('SELECT_CATEGORIES')}</Label>

            <DropDown />
          </View>


          <Label>{translate('UPLOAD_DOCUMENT')}</Label>





          {submitError ? (
            <Label style={{ alignSelf: 'center', color: colors.error }}>
              {submitError}
            </Label>
          ) : null}


          {/* <TouchableOpacity
            disabled={submitDisabled}
            onPress={handleSubmit}

            style={submitStyles}
          >

            {loading ? (
              <ActivityIndicator color={colors.white} size={20} />
            ) : (
                <Text style={styles.submitBtnText}>{translate('SIGN_UP')}</Text>
              )}
          </TouchableOpacity>
          <Label>{translate('REGISTER_BUTTON')}</Label> */}
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