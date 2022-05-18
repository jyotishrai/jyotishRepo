import { BASE_URL, API } from '../constants'
import {
    changeRestroOnlineStatusApiRequest,
    changeRestroOnlineStatusApiSuccess,
    changeRestroOnlineStatusApiFail
} from '../actionCreators'
import axios from 'axios'

export const changeRestroOnlineStatusApi = userdata => async dispatch => {

    await dispatch(changeRestroOnlineStatusApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.CHANGE_RESTRO_ONLINE_STATUS, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
        //  console.log("response data:::00000dfgr::::", res.data);
        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(changeRestroOnlineStatusApiFail(res.data.message))
            return (res.data.message)
        } else {

            dispatch(changeRestroOnlineStatusApiSuccess(res.data))
            return (res.data)
        }

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(changeRestroOnlineStatusApiFail(message))
        return (res.data)
    })
}