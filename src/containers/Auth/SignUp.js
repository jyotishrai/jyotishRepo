import { connect } from 'react-redux'

import SignUp from '../../components/Auth/SignUp'
import {
  // connectAndSubscribe,
  // createUser,
  // login,
  signUpApp,
  countryList,
  stateList,
  cityList,
  regionList,
  stateClearList,
  countryClearList,
  cityClearList,
  regionClearList,
  // updateUser,
  listSignupCategoryApi
} from '../../thunks'

const mapStateToProps = ({ AppUsers, LocationList, SignupListCategories }) => ({
  loading: AppUsers.loading,
  //loading: LocationList.loading,
  country: LocationList.country,
  stateData: LocationList.stateData,
  city: LocationList.city,
  region: LocationList.region,
  listSignupCategories: LocationList.listSignupCategories,
  signUp: AppUsers.signUp
  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  // connectAndSubscribe,
  // createUser,
  // signIn: login,
  signUpApp: signUpApp,
  countryList: countryList,
  stateList: stateList,
  cityList: cityList,
  regionList: regionList,
  stateClearList: stateClearList,
  countryClearList: countryClearList,
  cityClearList: cityClearList,
  regionClearList: regionClearList,
  // updateUser,
  listSignupCategoryApi: listSignupCategoryApi
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)