import {
  APP_DASHBOARD_REQUEST,
  APP_DASHBOARD_SUCCESS,
  APP_DASHBOARD_FAIL,
} from '../constants'

export function dashBoardRequestApi(data) {
  return { type: APP_DASHBOARD_REQUEST, payload: data }
}

export function restroDashBoardSuccess(data) {
  return { type: APP_DASHBOARD_SUCCESS, payload: data }
}

export function dashboardApiFailed(data) {
  return { type: APP_DASHBOARD_FAIL, payload: data }
}

