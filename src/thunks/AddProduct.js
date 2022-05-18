import { BASE_URL, API, APP_PARAMS } from '../constants'
import {
    listAddProductTypeApiRequest,
    listAddProductTypeApiSuccess,
    listAddProductTypeApiFail,

    addProductTypeApiRequest,
    addProductTypeApiSuccess,
    addProductTypeApiFail,

    updateProductTypeApiRequest,
    updateProductTypeApiSuccess,
    updateProductTypeApiFail
} from '../actionCreators'
import axios from 'axios'
import { getFormDataFromObject } from '../utility/Utils'

export const listAddProductTypeApi = userdata => async dispatch => {
    // console.log("Url :: ", API.LIST_CATEGORY, "request data ::::::::1", userdata);
    await dispatch(listAddProductTypeApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.LIST_CATEGORY, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        if (res.data != undefined && res.data.data != null) {
            let data = [{ name: APP_PARAMS.SELECT_ITEM, label: APP_PARAMS.SELECT_ITEM }]
            data = [...data, ...res.data.data]
            dispatch(listAddProductTypeApiSuccess(data))
        } else {
            dispatch(listAddProductTypeApiFail(res.data.message))
        }
        return (res.data)
    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(listAddProductTypeApiFail(message))
        return (res.data)
    })
}

export const addProductApi = userdata => async dispatch => {
    //alert('thunk')
     //console.log('URL::::::', API.ADD_PRODUCT, 'addProductApi:::::::::::::::::, ', userdata);
    await dispatch(addProductTypeApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata) //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN],
        'Accept-Language': 'en'
    }

    return axios.post(API.ADD_PRODUCT, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
        // alert(JSON.stringify(res))
        // console.log('responsedata::::::::::::::::::::::::::::::::::::::::::::::::::::', res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(addProductTypeApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(addProductTypeApiSuccess(res.data))
            return (res.data)
        }

    }).catch((error) => {
        const message = "Server don't response correctaly"
        dispatch(addProductTypeApiFail(message))
        return (res.data)
    })
}

export const updateProductApi = userdata => async dispatch => {

    // console.log('URL::::::', API.ADD_PRODUCT, 'updateProductApi:::::::::::::::::, ', userdata);
    await dispatch(updateProductTypeApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata) //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
    }

    return axios.post(API.UPDATE_PRODUCT, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
        //  console.log('updateResponsedata::::::::::::::::::::::::::::::::::::::::::::::::::::', res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(updateProductTypeApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(updateProductTypeApiSuccess(res.data))
            return (res.data)
        }
    }).catch((error) => {
        const message = "Server don't response correctaly"
        dispatch(updateProductTypeApiFail(message))
        return (res.data)
    })
}