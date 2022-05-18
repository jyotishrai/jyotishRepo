import { BASE_URL, API, APP_PARAMS } from '../constants'
import {
    addCategoryApiRequest,
    addCategoryApiSuccess,
    addCategoryApiFail,

    editCategoryApiRequest,
    editCategoryApiSuccess,
    editCategoryApiFail
} from '../actionCreators/AddProductType'

import axios from 'axios'
import { getFormDataFromObject } from '../utility/Utils'

export const addCategoryApi = userdata => async dispatch => {

    await dispatch(addCategoryApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata) //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
    }

    return axios.post(API.ADD_CATEGORY, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(addCategoryApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(addCategoryApiSuccess(res.data))
            return (res.data)
        }
    }).catch((error) => {
        const message = "Server don't response Correctaly"
        dispatch(addCategoryApiFail(message))
        return (res.data)
    })
}

// edit api reques Response::::::::::

export const editCategoryApi = userdata => async dispatch => {

    await dispatch(editCategoryApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata) //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
    }

    return axios.post(API.EDIT_CATEGORY, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(editCategoryApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(editCategoryApiSuccess(res.data))
            return (res.data)
        }
    }).catch((error) => {
        const message = "Server don't response Correctaly"
        dispatch(editCategoryApiFail(message))
        return (res.data)
    })
}