import {

    APP_LIST_PRODUCT_TYPE_REQUEST,
    APP_LIST_PRODUCT_TYPE_SUCCESS,
    APP_LIST_PRODUCT_TYPE_FAIL

} from '../constants'


export function listProductTypeApiRequest(data) {

    return { type: APP_LIST_PRODUCT_TYPE_REQUEST, payload: data }
}

export function listProductTypeApiSuccess(data) {
    return { type: APP_LIST_PRODUCT_TYPE_SUCCESS, payload: data }

}

export function listProductTypeApiFail(data) {
    return { type: APP_LIST_PRODUCT_TYPE_FAIL, payload: data }
}