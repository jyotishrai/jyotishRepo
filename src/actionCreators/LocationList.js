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


export function countryApi(data) {
  return { type: APP_COUNTRY_REQUEST, payload: data }
}
export function countrySuccess(user) {
  return { type: APP_COUNTRY_SUCCESS, payload: user }
}
export function countryApiFailed(user) {
  return { type: APP_COUNTRY_FAIL, payload: user }
}
export function countryClearData(user) {
  return { type: APP_COUNTRY_CLEAR, payload: user }
}

export function stateApi(data) {
  return { type: APP_STATE_REQUEST, payload: data }
}
export function stateApiSuccess(user) {
  return { type: APP_STATE_SUCCESS, payload: user }
}
export function stateApiFailed(user) {
  return { type: APP_STATE_FAIL, payload: user }
}
export function stateClearData(user) {
  return { type: APP_STATE_CLEAR, payload: user }
}

export function cityApi(data) {
  return { type: APP_CITY_REQUEST, payload: data }
}
export function cityApiSuccess(user) {
  return { type: APP_CITY_SUCCESS, payload: user }
}
export function cityApiFailed(user) {
  return { type: APP_CITY_FAIL, payload: user }
}
export function cityClearData(user) {
  return { type: APP_CITY_CLEAR, payload: user }
}

export function regionApi(data) {
  return { type: APP_REGION_REQUEST, payload: data }
}
export function regionApiSuccess(user) {
  return { type: APP_REGION_SUCCESS, payload: user }
}
export function regionApiFailed(user) {
  return { type: APP_REGION_FAIL, payload: user }
}
export function regionClearData(user) {
  return { type: APP_REGION_CLEAR, payload: user }
}

export function myProfileApiRequest(data) {
  return { type: MY_PROFILE_REQUEST, payload: data }
}
export function myProfileApiSuccess(data) {
  return { type: MY_PROFILE_SUCCESS, payload: data }
}
export function myProfileApiFail(data) {
  return { type: MY_PROFILE_FAIL, payload: data }
}

export function listSignupCategoriesRequst(data) {
  return { type: LIST_SIGNUP_CATEGORY_REQUEST, payload: data }
}
export function listSignupCategoriesSuccess(data) {
  return { type: LIST_SIGNUP_CATEGORY_SUCCESS, payload: data }
}
export function listSignupCategoriesFail(data) {
  return { type: LIST_SIGNUP_CATEGORY_FAIL, payload: data }
}