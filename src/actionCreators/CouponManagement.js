

import {

    APP_LISTCOUPONCODE_REQUEST,
    APP_LISTCOUPONCODE_SUCCESS,
    APP_LISTCOUPONCODE_FAIL

} from '../constants'


export function listCouponCodeApiRequest(data) {

    return { type: APP_LISTCOUPONCODE_REQUEST, payload: data }
}

export function listCouponCodeApiSuccess(data) {
    return { type: APP_LISTCOUPONCODE_SUCCESS, payload: data }

}

export function listCouponCodeApiFail(data) {
    return { type: APP_LISTCOUPONCODE_FAIL, payload: data }
}