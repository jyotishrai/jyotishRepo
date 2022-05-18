

import {
    APP_LIST_PRODUCT_REQUEST,
    APP_LIST_PRODUCT_SUCCESS,
    APP_LIST_PRODUCT_FAIL

} from '../constants'


const initialState = {
    error: undefined,
    loading: false,
    listProduct: undefined
}


export default (state = initialState, action) => {

    switch (action.type) {
        case APP_LIST_PRODUCT_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_LIST_PRODUCT_FAIL:
            return { ...state, error: action.error, loading: false }

        case APP_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                error: undefined,

                listProduct: { ...state.listProduct, ...action.payload }


            }
        default: return state
    }
}