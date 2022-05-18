
import { BASE_URL, API, APP_PARAMS } from '../constants'

import {
    discountApiRequest,
    discountApiSuccess,
    discountApiFail,
    editDiscountApiRequest,
    editDiscountApiSuccess,
    editDiscountApiFail,
    editCategoryApiFail
} from '../actionCreators'

import axios from 'axios';
import { getFormDataFromObject } from '../utility/Utils'

export const callDiscountApi = userData => async dispatch => {

    await dispatch(discountApiRequest(userData))
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');
    // console.warn("request data:::::::", userData);
    return axios.post(API.DISCOUNT_DETAILS, urlParameters, {
        headersP: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(discountApiFail(res.data.message))
            return (res.data.message)
        } else {
            // console.log("request data:::00000dfgr::::", res.data);
            dispatch(discountApiSuccess(res.data.data))
            return (res.data)
        }
    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(discountApiFail(message))
        return (res.data)
    })
}

export const editDiscountApi = userdata => async dispatch => {

    await dispatch(editDiscountApiRequest(userdata))
    let urlParameters = getFormDataFromObject(userdata) //Object.entries(userdata).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
    }

    return axios.post(API.EDIT_DISCOUNT, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
    }).then((res) => {
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(editCategoryApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(editDiscountApiSuccess(res.data))
            return (res.data)
        }
    }).catch((error) => {
        const message = "Server don't response correctaly"
        dispatch(editDiscountApiFail(message))
        return (res.data)
    })
}

// export const editDiscountApi = userData => async dispatch => {
//     //alert(JSON.stringify(userData))
//     await dispatch(editDiscountApiRequest(userData))
//     let urlParameters = getFormDataFromObject(userdata) //Object.entries(userdata).map(e => e.join('=')).join('&');

//     const AuthStr = {
//         'content-type': 'application/x-www-form-urlencoded',
//         Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
//     }

//     return axios.post(API.EDIT_DISCOUNT, urlParameters, {
//         headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr
//     }).then((res) => {
//         alert(JSON.stringify(res))
//         if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
//             dispatch(editDiscountApiFail(res.data.message))
//             alert('Fail')
//             return (res.data.message)
//         }
//         else {
//             dispatch(editDiscountApiSuccess(res.data.data))
//             //  alert('SUCCESS')
//             return (res.data)
//         }
//     }).catch((err) => {
//         alert(JSON.stringify(err))
//         const message = "Server dont response correctaly";
//         // alert(message)
//         dispatch(editDiscountApiFail(message))
//         return (res.data)
//     })
// }