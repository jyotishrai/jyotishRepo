import {
    APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_SUCCESS,
    APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_REQUEST,
    APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_FAIL,

    APP_ADD_PRODUCT_TYPE_REQUEST,
    APP_ADD_PRODUCT_TYPE_SUCCESS,
    APP_ADD_PRODUCT_TYPE_FAIL,

    APP_UPDATE_PRODUCT_TYPE_REQUEST,
    APP_UPDATE_PRODUCT_TYPE_SUCCESS,
    APP_UPDATE_PRODUCT_TYPE_FAIL,
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    productType: undefined,
    addProduct: undefined,
    updateProduct: undefined
}

export default (state = initialState, action) => {
    switch (action.type) {

        case APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_REQUEST:
            return { ...state, error: undefined, loading: true }
        case APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_FAIL:
            return { ...state, error: undefined, loading: false }
        case APP_ADD_PRODUCT_LIST_PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                productType: action.payload
            }

        case APP_ADD_PRODUCT_TYPE_REQUEST:
            return { ...state, error: undefined, loading: true }
        case APP_ADD_PRODUCT_TYPE_FAIL:
            return { ...state, error: undefined, loading: false }
        case APP_ADD_PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                addProduct: action.payload
            }

        case APP_UPDATE_PRODUCT_TYPE_REQUEST:
            return { ...state, error: undefined, loading: true }
        case APP_UPDATE_PRODUCT_TYPE_FAIL:
            return { ...state, error: undefined, loading: false }
        case APP_UPDATE_PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                updateProduct: action.payload
            }

        default: return state
    }
}