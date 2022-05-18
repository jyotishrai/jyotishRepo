import { BASE_URL, API } from '../constants'


import {
    listProductTypeApiRequest,
    listProductTypeApiSuccess,
    listProductTypeApiFail,


} from '../actionCreators'


import axios from 'axios'

export const listProductTypeApi = userdata => async dispatch => {
    // console.log("Url :: ", API.LIST_CATEGORY, "request data ::::::::1", userdata);

    await dispatch(listProductTypeApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');


    return axios.post(API.LIST_CATEGORY, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
        // console.log("response data:::00000dfgr::::", res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(listProductTypeApiFail(res.data.message))
            return (res.data.message)
        } else {

            dispatch(listProductTypeApiSuccess(res.data))
            return (res.data)
        }

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(listProductTypeApiFail(message))
        return (res.data)
    })



}