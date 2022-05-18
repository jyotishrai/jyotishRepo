

import { BASE_URL, API } from '../constants'

import {

    listProductApiRequest,
    listProductApiSuccess,
    listProductApiFail

} from '../actionCreators'


import axios from 'axios'



export const listProductApi = userdata => async dispatch => {



    await dispatch(listProductApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    // console.log("requestdata:::::::", userdata);


    return axios.post(API.LIST_PRODUCT, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {

        //  console.log("response data:::00000dfgr::::", res.data);


        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(listProductApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(listProductApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
        const message = "Server don't respond correctaly"
        dispatch(listProductApiFail(message))
        return (res.data)
    })

}

