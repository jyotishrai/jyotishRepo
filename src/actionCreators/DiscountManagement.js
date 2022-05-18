import {

    APP_DISCOUNT_MANAGEMENT_REQUEST,
    APP_DISCOUNT_MANAGEMENT_SUCCESS,
    APP_DISCOUNT_MANAGEMENT_FAIL,


    APP_EDIT_DISCOUNT_REQUEST,
    APP_EDIT_DISCOUNT_SUCCESS,
    APP_EDIT_DISCOUNT_FAIL
} from '../constants'


export function discountApiRequest(data) {
    return { type: APP_DISCOUNT_MANAGEMENT_REQUEST, payload: data }
}

export function discountApiSuccess(data) {
    return { type: APP_DISCOUNT_MANAGEMENT_SUCCESS, payload: data }
}

export function discountApiFail(data) {
    return { type: APP_DISCOUNT_MANAGEMENT_FAIL, payload: data }
}


export function editDiscountApiRequest(data) {
    return { type: APP_EDIT_DISCOUNT_REQUEST, payload: data }
}


export function editDiscountApiSuccess(data) {
    return { type: APP_EDIT_DISCOUNT_SUCCESS, payload: data }
}


export function editDiscountApiFail(data) {
    return { type: APP_EDIT_DISCOUNT_FAIL, payload: data }
}
// export function editApi
