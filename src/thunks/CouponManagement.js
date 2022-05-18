import { BASE_URL, API } from '../constants'
import {
    listCouponCodeApiRequest,
    listCouponCodeApiSuccess,
    listCouponCodeApiFail
} from '../actionCreators'
import axios from 'axios'

export const listCouponCodeApi = userdata => async dispatch => {
    // console.log("Url :: ", API.LISTCOUPONCODE, "request data ::::::::1", userdata);

    await dispatch(listCouponCodeApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');


    return axios.post(API.LISTCOUPONCODE, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
         console.log("response"+API.LISTCOUPONCODE, res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(listCouponCodeApiFail(res.data.message))
            return (res.data.message)
        } else {

            dispatch(listCouponCodeApiSuccess(res.data))
            return (res.data)
        }

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(listCouponCodeApiFail(message))
        return (res.data)
    })



}