import {
    APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_FAIL,
    APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_SUCCESS,
    APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_REQUEST,

    APP_ADD_PRODUCT_TYPE_REQUEST,
    APP_ADD_PRODUCT_TYPE_SUCCESS,
    APP_ADD_PRODUCT_TYPE_FAIL,

    APP_UPDATE_PRODUCT_TYPE_REQUEST,
    APP_UPDATE_PRODUCT_TYPE_SUCCESS,
    APP_UPDATE_PRODUCT_TYPE_FAIL,
} from '../constants'


export function listAddProductTypeApiRequest(data) {

    return { type: APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_REQUEST, payload: data }
}

export function listAddProductTypeApiSuccess(data) {
    return { type: APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_SUCCESS, payload: data }

}

export function listAddProductTypeApiFail(data) {
    return { type: APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_FAIL, payload: data }
}

export function addProductTypeApiRequest(data) {

    return { type: APP_ADD_PRODUCT_TYPE_REQUEST, payload: data }
}

export function addProductTypeApiSuccess(data) {
    return { type: APP_ADD_PRODUCT_TYPE_SUCCESS, payload: data }

}

export function addProductTypeApiFail(data) {
    return { type: APP_ADD_PRODUCT_TYPE_FAIL, payload: data }
}

export function updateProductTypeApiRequest(data) {

    return { type: APP_UPDATE_PRODUCT_TYPE_REQUEST, payload: data }
}

export function updateProductTypeApiSuccess(data) {
    return { type: APP_UPDATE_PRODUCT_TYPE_SUCCESS, payload: data }

}

export function updateProductTypeApiFail(data) {
    return { type: APP_UPDATE_PRODUCT_TYPE_FAIL, payload: data }
}