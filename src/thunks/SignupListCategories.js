import { BASE_URL, API, APP_PARAMS } from '../constants'
import {
    listSignupCategoriesRequst,
    listSignupCategoriesSuccess,
    listSignupCategoriesFail
} from '../actionCreators'
import axios from 'axios'

export const listSignupCategoryApi = userdata => async dispatch => {

    await dispatch(listSignupCategoriesRequst(userdata))
    let urlParameters = Object.entries(userdata).map(e => e.join('=')).join('&');

    return axios.post(API.LIST_SIGNUP_CATEGORIES, urlParameters, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
        if (res.data != undefined && res.data.data != null) {
            // let data = [{ name: APP_PARAMS.SELECT_ITEM, label: APP_PARAMS.SELECT_ITEM }]
            // data = [...data, ...res.data.data]
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