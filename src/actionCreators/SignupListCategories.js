import {
    LIST_SIGNUP_CATEGORY_REQUEST,
    LIST_SIGNUP_CATEGORY_SUCCESS,
    LIST_SIGNUP_CATEGORY_FAIL,
} from '../constants'


export function listSignupCategoriesRequst(data) {
    return { type: LIST_SIGNUP_CATEGORY_REQUEST, payload: data }
}

export function listSignupCategoriesSuccess(data) {
    return { type: LIST_SIGNUP_CATEGORY_SUCCESS, payload: data }
}

export function listSignupCategoriesFail(data) {
    return { type: LIST_SIGNUP_CATEGORY_SUCCESS, payload: data }
}