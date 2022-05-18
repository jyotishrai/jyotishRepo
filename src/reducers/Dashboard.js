import {
  APP_DASHBOARD_REQUEST,
  APP_DASHBOARD_FAIL,
  APP_DASHBOARD_SUCCESS,
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  loggedIn: false,
  login: '',
  password: '',
  user: undefined,
  dashboardData: undefined
}

export default (state = initialState, action) => {
  // alert(JSON.stringify(action.payload))
  switch (action.type) {
    case APP_DASHBOARD_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_DASHBOARD_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardData: { ...state.dashboardData, ...action.payload }
        //loggedIn: true,
        // login: initialState.login,
        // password: initialState.password,
        //user: { ...state.user, ...action.payload }

      }

    default: return state
  }
}