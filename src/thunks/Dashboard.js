import {
    BASE_URL, API
} from '../constants'

import {
    dashBoardRequestApi,
    restroDashBoardSuccess,
    dashboardApiFailed,
} from '../actionCreators'

import axios from 'axios'

export const callDashBoardApi = userData => async dispatch => {
    await dispatch(dashBoardRequestApi(userData))

    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');

    return axios.post(API.DASHBOARD_RECENT_DATA, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
        dispatch(restroDashBoardSuccess(res.data))
        return (res.data)
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(dashboardApiFailed(message))
            return (res.data)
        })
}

