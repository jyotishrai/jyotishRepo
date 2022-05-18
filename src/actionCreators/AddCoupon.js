import {

    APP_ADDCOUPONCODE_REQUEST,
    APP_ADDCOUPONCODE_SUCCESS,
    APP_ADDCOUPONCODE_FAIL,

    APP_EDITCOUPONCODE_REQUEST,
    APP_EDITCOUPONCODE_SUCCESS,
    APP_EDITCOUPONCODE_FAIL
} from '../constants'


//addCouponCodeApi

export function addCouponCodeApiRequest(data) {
    return { type: APP_ADDCOUPONCODE_REQUEST, payload: data }
}

export function addCouponCodeApiSuccess(data) {
    return { type: APP_ADDCOUPONCODE_SUCCESS, payload: data }
}

export function addCouponCodeApiFail(data) {
    return { type: APP_ADDCOUPONCODE_FAIL, payload: data }
}

//editCouponCodeApi
export function editCouponCodeApiRequest(data) {
    return { type: APP_EDITCOUPONCODE_REQUEST, payload: data }
}

export function editCouponCodeApiSuccess(data) {
    return { type: APP_EDITCOUPONCODE_SUCCESS, payload: data }
}

export function editCouponCodeApiFail(data) {
    return { type: APP_EDITCOUPONCODE_FAIL, payload: data }
}