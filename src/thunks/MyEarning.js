import { BASE_URL, API } from '../constants'
import {
    myEarningApiRequest,
    myEarningApiSuccess,
    myEarningApiFail,

    perWeekEarningApiRequest,
    perWeekEarningApiSuccess,
    perWeekEarningApiFail
} from '../actionCreators'
import axios from 'axios'

export const listMyEarningApi = userdata => async dispatch => {
    // console.log("Url :: vijay", API.MYEARNING, "request data ::::::::1", userdata);

    await dispatch(myEarningApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.MYEARNING, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
        //  console.log("response data:::00000dfgr::::", res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(myEarningApiFail(res.data.message))
            //alert('fail')
            return (res.data.message)
        } else {

            dispatch(myEarningApiSuccess(res.data))
            //alert('success')
            return (res.data)
        }

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(myEarningApiFail(message))
        return (res.data)
    })
}

export const listPerWeekEarningApi = userdata => async dispatch => {
    // console.log("Url :: vijay", API.PERWEEKEARNING, "request data ::::::::1", userdata);

    await dispatch(perWeekEarningApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.PERWEEKEARNING, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
        //console.log("response data:::00000dfgr::::", res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(perWeekEarningApiFail(res.data.message))
            //alert('fail')
            return (res.data.message)
        } else {

            dispatch(perWeekEarningApiSuccess(res.data))
            //alert('success')
            return (res.data)
        }

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(perWeekEarningApiFail(message))
        return (res.data)
    })
}