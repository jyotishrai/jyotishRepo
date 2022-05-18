import {

    APP_ADD_CATEGORY_REQUEST,
    APP_ADD_CATEGORY_SUCCESS,

    APP_ADD_CATEGORY_FAIL,




    APP_EDIT_CATEGORY_REQUEST,
    APP_EDIT_CATEGORY_SUCCESS,

    APP_EDIT_CATEGORY_FAIL







} from '../constants'


export function addCategoryApiRequest(data) {

    return { type: APP_ADD_CATEGORY_REQUEST, payload: data }

}


export function addCategoryApiSuccess(data) {

    return { type: APP_ADD_CATEGORY_SUCCESS, payload: data }

}

export function addCategoryApiFail(data) {

    return { type: APP_ADD_CATEGORY_FAIL, payload: data }

}



// edit category type set::::

export function editCategoryApiRequest(data) {

    return { type: APP_EDIT_CATEGORY_REQUEST, payload: data }

}


export function editCategoryApiSuccess(data) {

    return { type: APP_EDIT_CATEGORY_SUCCESS, payload: data }

}

export function editCategoryApiFail(data) {

    return { type: APP_EDIT_CATEGORY_FAIL, payload: data }

}