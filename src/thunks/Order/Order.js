import { BASE_URL, API, APP_PARAMS } from '../../constants'
import {
    listOrderApiRequest,
    listOrderApiSuccess,
    listOrderApiFail,

    changeOrderStatusRequest,
    changeOrderStatusSuccess,
    changeOrderStatusFail
} from '../../actionCreators'

import axios from 'axios'

import { getFormDataFromObject } from '../../utility/Utils'

export const listOrderApi = userdata => async dispatch => {
    await dispatch(listOrderApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.ORDER_LIST, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }

    }).then((res) => {
        //alert(JSON.stringify(res))
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(listOrderApiFail(userdata))
            return (res.data.message)
        } else {
            let data = res.data
            data[APP_PARAMS.ORDER_STATUS] = userdata[APP_PARAMS.STATUS]
            dispatch(listOrderApiSuccess(data))
            return (data)
        }
    }).catch((err) => {
        const message = "Server Don't Response Correctly"
        dispatch(listOrderApiFail(userdata))
        return (res.data)
    })
}

export const changeOrderStatusApi = userdata => async dispatch => {
    await dispatch(changeOrderStatusRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.CHANGE_ORDER_STATUS, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }

    }).then((res) => {
        //alert(JSON.stringify(res))
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(changeOrderStatusFail(res.data.message))
            return (res.data.message)
        } else {
            // data = res.data
            //data[APP_PARAMS.ORDER_STATUS] = userdata[APP_PARAMS.STATUS]
            dispatch(changeOrderStatusSuccess(data))
            return (data)
        }
    }).catch((err) => {
        const message = "Server Don't Response Correctly"
        dispatch(changeOrderStatusFail(message))
        return (res.data)
    })
}