import {
  APP_COUNTRY_REQUEST,
  APP_COUNTRY_SUCCESS,
  APP_COUNTRY_FAIL,
  APP_COUNTRY_CLEAR,

  APP_STATE_REQUEST,
  APP_STATE_SUCCESS,
  APP_STATE_FAIL,
  APP_STATE_CLEAR,

  APP_CITY_REQUEST,
  APP_CITY_SUCCESS,
  APP_CITY_FAIL,
  APP_CITY_CLEAR,

  APP_REGION_REQUEST,
  APP_REGION_SUCCESS,
  APP_REGION_FAIL,
  APP_REGION_CLEAR,

  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,
  MY_PROFILE_FAIL,

  LIST_SIGNUP_CATEGORY_REQUEST,
  LIST_SIGNUP_CATEGORY_SUCCESS,
  LIST_SIGNUP_CATEGORY_FAIL,
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  country: undefined,
  stateData: undefined,
  city: undefined,
  region: undefined,
  myProfile: undefined,
  listSignupCategories: undefined
}

export default (state = initialState, action) => {

  switch (action.type) {

    case APP_COUNTRY_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_COUNTRY_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        country: action.payload
      }

    case APP_COUNTRY_CLEAR:
      return {
        ...state,
        loading: false,
        country: action.payload
      }

    case APP_STATE_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_STATE_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        stateData: action.payload
      }
    case APP_STATE_CLEAR:
      return {
        ...state,
        loading: false,
        stateData: action.payload
      }

    case APP_CITY_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_CITY_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        city: action.payload
      }

    case APP_CITY_CLEAR:
      return {
        ...state,
        loading: false,
        city: action.payload
      }

    case APP_REGION_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_REGION_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_REGION_SUCCESS:
      return {
        ...state,
        loading: false,
        region: action.payload
      }
    case APP_REGION_CLEAR:
      return {
        ...state,
        loading: false,
        region: action.payload
      }

    case MY_PROFILE_REQUEST:
      return { ...state, error: undefined, loading: true }

    case MY_PROFILE_FAIL:
      return { ...state, error: action.error, loading: false }

    case MY_PROFILE_SUCCESS:
      //console.warn(action.payload)
      return {
        ...state,
        loading: false,
        myProfile: { ...state.myProfile, ...action.payload },
        country: action.payload.data.country,
        stateData: action.payload.data.state,
        city: action.payload.data.city,
        region: action.payload.data.region,
      }

    case LIST_SIGNUP_CATEGORY_REQUEST:
      return { ...state, error: undefined, loading: true }

    case LIST_SIGNUP_CATEGORY_FAIL:
      return { ...state, error: action.error, loading: false }

    case LIST_SIGNUP_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        listSignupCategories: action.payload
      }

    default: return state
  }
}