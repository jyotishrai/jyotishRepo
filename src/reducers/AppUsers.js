import {
  APP_LOGIN_RESTRO_SUCCESS,
  APP_LOGIN_RESTRO_FAIL,
  APP_LOGIN_RESTRO_REQUEST,

  APP_SIGN_UP_REQUEST,
  APP_SIGN_UP_SUCCESS,
  APP_SIGN_UP_FAIL
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  loggedIn: false,
  login: '',
  password: '',
  user: undefined,
  signUp: undefined
}

export default (state = initialState, action) => {

  switch (action.type) {
    case APP_LOGIN_RESTRO_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_LOGIN_RESTRO_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_LOGIN_RESTRO_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        login: initialState.login,
        password: initialState.password,
        user: { ...state.user, ...action.payload }
      }

    case APP_SIGN_UP_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_SIGN_UP_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        signUp: action.payload
      }

    default: return state
  }
}