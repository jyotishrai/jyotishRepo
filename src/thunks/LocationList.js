

import {
    BASE_URL, API, APP_PARAMS
} from '../constants'

import {
    countryApi,
    countrySuccess,
    countryApiFailed,
    countryClearData,

    stateApi,
    stateApiSuccess,
    stateApiFailed,
    stateClearData,

    cityApi,
    cityApiSuccess,
    cityApiFailed,
    cityClearData,

    regionApi,
    regionApiSuccess,
    regionApiFailed,
    regionClearData,

    myProfileApiRequest,
    myProfileApiSuccess,
    myProfileApiFail,

    listSignupCategoriesRequst,
    listSignupCategoriesSuccess,
    listSignupCategoriesFail
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

export const countryList = userData => async dispatch => {
    await dispatch(countryApi(userData))
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');

    return axios.post(BASE_URL + API.COUNTRY_LIST, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res.data.data))
        if (res != undefined) {
            let data = [{ name: APP_PARAMS.SELECT_ITEM, label: APP_PARAMS.SELECT_ITEM }]
            data = [...data, ...res.data.data]
            dispatch(countrySuccess(data))
        } else {
            dispatch(countryApiFailed("No Items Found"))
        }
        return (res.data)
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(countryApiFailed(message))
            return (res.data)
        })
}

export const countryClearList = userData => async dispatch => {
    dispatch(countryClearData(undefined))
}

export const stateList = userData => async dispatch => {

    await dispatch(stateApi(userData))
    // console.log("URL:::", BASE_URL + API.STATE_LIST, "Request Data :", JSON.stringify(userData));
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');

    return axios.post(BASE_URL + API.STATE_LIST, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        let data = [{ name: APP_PARAMS.SELECT_ITEM, label: APP_PARAMS.SELECT_ITEM }]
        data = [...data, ...res.data.data]
        dispatch(stateApiSuccess(data))
        return (res.data)
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(stateApiFailed(message))
            return (res.data)
        })
}

export const stateClearList = userData => async dispatch => {
    dispatch(stateClearData(undefined))
}

export const cityList = userData => async dispatch => {
    await dispatch(cityApi(userData))
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');

    return axios.post(BASE_URL + API.CITY_LIST, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        let data = [{ name: APP_PARAMS.SELECT_ITEM, label: APP_PARAMS.SELECT_ITEM }]
        data = [...data, ...res.data.data]
        dispatch(cityApiSuccess(data))
        return (res.data)
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(cityApiFailed(message))
            return (res.data)
        })
}

export const cityClearList = userData => async dispatch => {
    dispatch(cityClearData(undefined))
}

export const regionList = userData => async dispatch => {
    await dispatch(regionApi(userData))
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');

    return axios.post(BASE_URL + API.REGION_LIST, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        let data = [{ name: APP_PARAMS.SELECT_ITEM, label: APP_PARAMS.SELECT_ITEM }]
        data = [...data, ...res.data.data]
        dispatch(regionApiSuccess(data))
        return (res.data)
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(regionApiFailed(message))
            return (res.data)
        })
}

export const regionClearList = userData => async dispatch => {
    dispatch(regionClearData(undefined))
}

export const myProfileApi = userdata => async dispatch => {

    await dispatch(myProfileApiRequest(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.MY_PROFILE, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
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

export const listSignupCategoryApi = userdata => async dispatch => {
    //alert('thunk')
    await dispatch(listSignupCategoriesRequst(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.LIST_SIGNUP_CATEGORIES, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        //alert(JSON.stringify(res))
        if (res.data != undefined && res.data.data != null) {
            // let data = [{ isChecked: false }]
            // data = [...data, ...res.data]
            dispatch(listSignupCategoriesSuccess(res.data.data))
        } else {
            dispatch(listSignupCategoriesFail(res.data.message))
        }
        return (res.data)

    }).catch((err) => {
        const message = "Server don't response correctly";
        dispatch(listSignupCategoriesFail(message))
        return (res.data)
    })
}