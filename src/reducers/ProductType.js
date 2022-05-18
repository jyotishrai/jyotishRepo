import {

    APP_LIST_PRODUCT_TYPE_REQUEST,
    APP_LIST_PRODUCT_TYPE_SUCCESS,
    APP_LIST_PRODUCT_TYPE_FAIL

} from '../constants'

const initialState = {
    error: undefined,
    loading: false,


    listProductType: undefined

}


export default (state = initialState, action) => {

    // console.log("APP_LOGIN_REQUEST:state:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", action.type);

    switch (action.type) {
        case APP_LIST_PRODUCT_TYPE_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_LIST_PRODUCT_TYPE_FAIL:
            return { ...state, error: action.error, loading: false }

        case APP_LIST_PRODUCT_TYPE_SUCCESS:

            return {
                ...state,
                loading: false,
                listProductType: { ...state.listProductType, ...action.payload }
            }

        default: return state
    }
}




