import { BASE_URL, API } from '../constants'
import {
    myProfileApiRequest,
    myProfileApiSuccess,
    myProfileApiFail,
} from '../actionCreators'
import axios from 'axios'

export const myProfileApi = userdata => async dispatch => {

    await dispatch(myProfileApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.MY_PROFILE, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {

        if (res.data.error == undefined || (res.data.error != undefined && res.data.error)) {
            dispatch(myProfileApiFail(res.data.message))
            return (res.data.message)
        } else {
            dispatch(myProfileApiSuccess(res.data))
            return (res.data)
        }

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(myProfileApiFail(message))
        return (res.data)
    })
}