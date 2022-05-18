import {
    APP_LIST_ORDER_REQUEST,
    APP_LIST_ORDER_SUCCESS,
    APP_LIST_ORDER_FAIL,

    CHANGE_ORDER_STATUS_REQUEST,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_ORDER_STATUS_FAIL
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

export function changeOrderStatusRequest(data) {
    return { type: CHANGE_ORDER_STATUS_REQUEST, payload: data }
}

export function changeOrderStatusSuccess(data) {
    return { type: CHANGE_ORDER_STATUS_SUCCESS, payload: data }
}

export function changeOrderStatusFail(data) {
    return { type: CHANGE_ORDER_STATUS_FAIL, payload: data }
}