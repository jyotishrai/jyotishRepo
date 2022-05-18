
import { BASE_URL, API, APP_PARAMS } from '../constants'
import {

    addCouponCodeApiRequest,
    addCouponCodeApiSuccess,
    addCouponCodeApiFail,

    editCouponCodeApiRequest,
    editCouponCodeApiSuccess,
    editCouponCodeApiFail
} from '../actionCreators/AddCoupon'

import axios from 'axios';

import { getFormDataFromObject } from '../utility/Utils'

export const editCouponCodeApi = userdata => async dispatch => {
    console.log('vdhjfjsgakjfhkjdhfhks:::::::::::::::::, ', userdata);
    await dispatch(editCouponCodeApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata)  //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
    }

    return axios.post(API.EDITCOUPONCODE, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
        // alert(JSON.stringify(res))
        //   console.log('responsedata::::::::::::::::::::::::::::::::::::::::::::::::::::', res.data);

        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(editCouponCodeApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(editCouponCodeApiSuccess(res.data))
            return (res.data)
        }
    }).catch((error) => {
        const message = "Server don't response correctaly"
        dispatch(editCouponCodeApiFail(message))
        return (res.data)
    })
}


export const addCouponCodeApi = userdata => async dispatch => {

    // console.log('vdhjfjsgakjfhkjdhfhks:::::::::::::::::, ', userdata);
    await dispatch(addCouponCodeApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata)  //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN],
        'Accept-Language': 'en'
    }

    return axios.post(API.ADDCOUPONCODE, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
       // alert(JSON.stringify(res))
        //  console.log('responsedata::::::::::::::::::::::::::::::::::::::::::::::::::::', res.data);

        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {

            dispatch(addCouponCodeApiFail(res.data.message))
            return (res.data.message)
        } else {

            dispatch(addCouponCodeApiSuccess(res.data))
            return (res.data)
        }

    }).catch((error) => {
        const message = "Server don't response correctaly"

        dispatch(addCouponCodeApiFail(message))
        return (res.data)
    })
}