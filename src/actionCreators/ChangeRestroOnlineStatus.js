import {
    CHANGE_RESTRO_ONLINE_STATUS_REQUEST,
    CHANGE_RESTRO_ONLINE_STATUS_SUCCESS,
    CHANGE_RESTRO_ONLINE_STATUS_FAIL,
} from '../constants'

export function changeRestroOnlineStatusApiRequest(data) {
    return { type: CHANGE_RESTRO_ONLINE_STATUS_REQUEST, payload: data }
}

export function changeRestroOnlineStatusApiSuccess(data) {
    return { type: CHANGE_RESTRO_ONLINE_STATUS_SUCCESS, payload: data }
}

export function changeRestroOnlineStatusApiFail(data) {
    return { type: CHANGE_RESTRO_ONLINE_STATUS_FAIL, payload: data }
}