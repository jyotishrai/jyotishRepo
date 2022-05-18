import {
    APP_LIST_ORDER_REQUEST,
    APP_LIST_ORDER_SUCCESS,
    APP_LIST_ORDER_FAIL
} from '../../constants'

export function listOrderApiRequest(data) {
    return { type: APP_LIST_ORDER_REQUEST, payload: data }
}

export function listOrderApiSuccess(data) {
    return { type: APP_LIST_ORDER_SUCCESS, payload: data }
}

export function listOrderApiFail(data) {
    return { type: APP_LIST_ORDER_FAIL, payload: data }
}