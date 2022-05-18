import {
    MY_PROFILE_REQUEST,
    MY_PROFILE_SUCCESS,
    MY_PROFILE_FAIL,
} from '../constants';

export function myProfileApiRequest(data) {

    return { type: MY_PROFILE_REQUEST, payload: data }
}

export function myProfileApiSuccess(data) {
    return { type: MY_PROFILE_SUCCESS, payload: data }

}

export function myProfileApiFail(data) {
    return { type: MY_PROFILE_FAIL, payload: data }
}