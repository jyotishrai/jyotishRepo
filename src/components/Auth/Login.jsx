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
import { colors } from '../../theme'
import images from '../../images'
import translate from '../../i18n/i18n';
import {
  APP_PARAMS, SCREEN
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CommonSubmitBtn from '../../common/CommonSubmitBtn';
import { storeData, retrieveData } from "../../utility/Utils";

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

// w3c email regex https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

let globalFormProps;

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    retrieveData(APP_PARAMS.USER_DATA, async (data) => {
      if (data) {
        global[APP_PARAMS.USER_DATA] = data;
        this.props.navigation.navigate(SCREEN.DASHBOARD)
      }
    }
    );
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      null
    ),
  })

  // validate = (values) => {

  //   const errors = []
  //   if (values.email) {
  //     if (values.email.indexOf('@') > -1) {
  //       if (!emailRegex.test(values.email)) {
  //         errors.email = translate('EMAIL_HINT')
  //       }
  //     } else {
  //       if (!/^[a-zA-Z][\w\-\.]{1,48}\w$/.test(values.email)) {
  //         errors.email = translate('EMAIL_HINT')
  //       }
  //     }
  //   } else {
  //     errors.email = translate('EMAIL_HINT')
  //   }
  //   if (values.password) {
  //     if (!/^(?=.{3,20}$)(?!.*([\s])\1{2})[\w\s]+$/.test(values.password)) {
  //       errors.password = translate('PASSWORD_HINT')
  //     }
  //   } else {
  //     errors.password = translate('PASSWORD_HINT')
  //   }
  //   return errors
  // }

  submit = (requestData) => {
    if (requestData.email == undefined) {
      showErrorToast(translate('ERROR_SIGNUP_ENTER_RESTRO_EMAIL'))
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(requestData.email)) {
      showErrorToast(translate('ERROR_SIGNUP_INVAID_RESTRO_EMAIL'))
    }
    else if (requestData.password == undefined) {
      showErrorToast(translate('ERROR_SIGNUP_ENTER_PASSWORD'))
    }
    else (
      //alert("SUCCESS")
      this.loginUser(requestData)
    )
  }

  loginUser = async (requestData, username) => {

    const { createUser, signIn, loginAppUser } = this.props
    let newLogin = { [APP_PARAMS.ROLE]: APP_PARAMS.RESTAURANT_ADMIN };
    newLogin[APP_PARAMS.EMAIL] = requestData.email
    newLogin[APP_PARAMS.PASSWORD] = requestData.password

    // let newLogin = { [APP_PARAMS.EMAIL]: requestData.email };
    // //newLogin[APP_PARAMS.EMAIL] = requestData.email
    // newLogin[APP_PARAMS.PASSWORD] = requestData.password

    loginAppUser(newLogin)
      .then(result => {
        if (result && result.data != undefined) {
          //alert(JSON.stringify(result))
          storeData(APP_PARAMS.USER_DATA, result.data)
          global[APP_PARAMS.USER_DATA] = result.data;
          this.props.navigation.navigate(SCREEN.DASHBOARD)
        } else {
          alert(JSON.stringify(result))
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
          <Image source={images.LOGO} style={{ resizeMode: 'center', }}></Image>
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
              keyboardType="email-address"
            />
          </View>
          <View style={styles.formControlView}>
            <Label>{translate('Password')}</Label>
            <Field
              activeStyle={styles.textInputActive}
              autoCapitalize="none"
              component={FormTextInput}
              editable={!loading}
              inputRef={_ref => this.usernameRef = _ref}
              name="password"
              secureTextEntry
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              style={styles.textInput}
              underlineColorAndroid={colors.transparent}
            />
          </View>
          {submitError ? (
            <Label style={{ alignSelf: 'center', color: colors.error }}>
              {submitError}
            </Label>
          ) : null}

          <CommonSubmitBtn
            submitDisabled={submitDisabled}
            handleSubmit={handleSubmit}
            submitStyles={submitStyles}
            submitBtnText={styles.submitBtnText}
            loading={loading}
            title={translate('LOGIN')}
          ></CommonSubmitBtn>

          <TouchableOpacity
            style={{ marginTop: 15, }}
            onPress={() => {
              //alert("asdvhvshj")
              // this.props.navigation.navigate("AppDrawer")
              this.props.navigation.navigate("SignUp")
              //this.props.navigation.navigate(SCREEN.DASHBOARD)
            }}
          >
            <Label
            >{translate('REGISTER_BUTTON')}</Label>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  render() {
    // console.log('loggggggin', this.props.loginResponse)
    return (
      <Form
        onSubmit={this.submit}
        render={this.renderForm}
  
      />
    )
  }
}