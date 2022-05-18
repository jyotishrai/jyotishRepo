import {
  // APP_LOGIN_REQUEST,
  // APP_LOGIN_SUCCESS,
  // APP_LOGIN_FAIL,


  APP_LOGIN_RESTRO_REQUEST,
  APP_LOGIN_RESTRO_SUCCESS,
  APP_LOGIN_RESTRO_FAIL,

  APP_SIGN_UP_REQUEST,
  APP_SIGN_UP_SUCCESS,
  APP_SIGN_UP_FAIL

} from '../constants'

export function loginApi(data) {
  return { type: APP_LOGIN_RESTRO_REQUEST, payload: data }
}

export function loginApiSuccess(user) {
  return { type: APP_LOGIN_RESTRO_SUCCESS, payload: user }
}

export function loginApiFailed(user) {
  return { type: APP_LOGIN_RESTRO_FAIL, payload: user }
}

export function signUpApiRequest(data) {
  return { type: APP_SIGN_UP_REQUEST, payload: data }
}

export function signUpApiSuccess(data) {
  return { type: APP_SIGN_UP_SUCCESS, payload: data }
}

export function signUpApiFailed(data) {
  return { type: APP_SIGN_UP_FAIL, payload: data }
}




// export function usersCreateSuccess(user) {
//   return { type: USERS_CREATE_SUCCESS, payload: user }
// }

// export function usersCreateFail(error) {
//   return { type: USERS_CREATE_FAIL, error }
// }

// export function usersGet(payload) {
//   return { type: USERS_GET_REQUEST, payload }
// }

// export function usersGetSuccess(data) {
//   return { type: USERS_GET_SUCCESS, payload: data }
// }

// export function usersGetFail(error) {
//   return { type: USERS_GET_FAIL, error }
// }

// export function usersUpdate(profile) {
//   return { type: USERS_UPDATE_REQUEST, payload: profile }
// }

// export function usersUpdateSuccess(user) {
//   return { type: USERS_UPDATE_SUCCESS, payload: user }
// }

// export function usersUpdateFail(error) {
//   return { type: USERS_UPDATE_FAIL, error }
// }

// export function usersSelect(userId) {
//   return { type: USERS_SELECT, payload: userId }
// }

// export function usersBulkSelect(userIds) {
//   return { type: USERS_BULK_SELECT, payload: userIds }
// }

// export function usersSetFilter(filter) {
//   return { type: USERS_SET_FILTER, payload: filter }
// }

// export function usersSetPage(page) {
//   return { type: USERS_SET_PAGE, payload: page }
// }