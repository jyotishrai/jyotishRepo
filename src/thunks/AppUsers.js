import {
    BASE_URL, API, APP_PARAMS, BASE_URL_RESTRO
} from '../constants'
import {
    loginApi,
    loginApiSuccess,
    loginApiFailed,
    signUpApiRequest,
    signUpApiSuccess,
    signUpApiFailed,
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

import { getFormDataFromObject } from '../utility/Utils'
import { LogBox } from 'react-native'

const backgroundColors = [
    '#53c6a2',
    '#fdd762',
    '#9261d3',
    '#43dce7',
    '#ffcc5a',
    '#ea4398',
    '#4a5de1',
    '#e95555',
    '#7eda54',
    '#f9b647',
]
const getRandomColor = () => {
    return backgroundColors[backgroundColors.length * Math.random() | 0]
}

export const loginApp = userData => async dispatch => {
    await dispatch(loginApi(userData))
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');
    //console.log("Amar/Amar", urlParameters)
    console.log("API_URL",API.LOGIN_RESTRO);
    return axios.post(API.LOGIN_RESTRO, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded','Accept-Language':'en' }
    }).then((res) => {
        // console.log("Amar Saxena", res)
        //alert("1");
       // alert(JSON.stringify(res))
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(loginApiFailed(res.data.message))
            return (res.data.message)
        } else {
           // alert(JSON.stringify(res.data))
           alert("Login Successfully")
            dispatch(loginApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            alert(JSON.stringify(err));
            console.log("server error "+JSON.stringify(err));
            const message = "Server don't response correctly";
            dispatch(loginApiFailed(message))
            return (res.data)
        })
}

export const signUpApp = userData => async dispatch => {
    //console.warn(JSON.stringify(userData))
    await dispatch(signUpApiRequest(userData))

    let urlParameters = getFormDataFromObject(userData) //Object.entries(userData).map(e => e.join('=')).join('&');

    const AuthStr = {
        'content-type': 'application/x-www-form-urlencoded'
        // Authorization: 'Bearer ' + global[APP_PARAMS.USER_DATA][APP_PARAMS.TOKEN]
    }

    return axios.post(API.SIGNUP_RESTRO, urlParameters, {
        headers: global[APP_PARAMS.USER_DATA] == undefined ? { 'content-type': 'application/x-www-form-urlencoded' } : AuthStr //{ 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        alert(JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(signUpApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(signUpApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            alert(JSON.stringify(err))
            const message = "Server don't response correctly";
            dispatch(signUpApiFailed(message))
            return (res.data)
        })
}