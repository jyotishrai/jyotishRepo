import { connect } from 'react-redux'

import Login from '../../components/Auth/Login'
import {
  // connectAndSubscribe,
  // createUser,
  // login,
  loginApp,
  // updateUser,
} from '../../thunks'

const mapStateToProps = ({ AppUsers }) => ({
  loading: AppUsers.loading,
  // loginResponse: AppUsers
  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  // connectAndSubscribe,
  // createUser,
  // signIn: login,
  loginAppUser: loginApp,
  // updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)