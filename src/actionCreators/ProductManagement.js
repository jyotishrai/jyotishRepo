import {

    APP_LIST_PRODUCT_REQUEST,
    APP_LIST_PRODUCT_SUCCESS,
    APP_LIST_PRODUCT_FAIL


} from '../constants'

export function listProductApiRequest(data) {
    return { type: APP_LIST_PRODUCT_REQUEST, payload: data }
}

export function listProductApiSuccess(data) {
    return { type: APP_LIST_PRODUCT_SUCCESS, payload: data }
}

export function listProductApiFail(data) {
    return { type: APP_LIST_PRODUCT_FAIL, payload: data }
}