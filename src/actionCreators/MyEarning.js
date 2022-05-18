import {
    MY_EARNING_REQUEST,
    MY_EARNING_SUCCESS,
    MY_EARNING_FAIL,
    PER_EARNING_REQUEST,
    PER_EARNING_SUCCESS,
    PER_EARNING_FAIL
} from '../constants';

export function myEarningApiRequest(data) {

    return { type: MY_EARNING_REQUEST, payload: data }
}

export function myEarningApiSuccess(data) {
    return { type: MY_EARNING_SUCCESS, payload: data }

}

export function myEarningApiFail(data) {
    return { type: MY_EARNING_FAIL, payload: data }
}

export function perWeekEarningApiRequest(data) {

    return { type: PER_EARNING_REQUEST, payload: data }
}

export function perWeekEarningApiSuccess(data) {
    return { type: PER_EARNING_SUCCESS, payload: data }

}

export function perWeekEarningApiFail(data) {
    return { type: PER_EARNING_FAIL, payload: data }
}