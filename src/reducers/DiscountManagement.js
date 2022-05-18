import {

    APP_DISCOUNT_MANAGEMENT_REQUEST,
    APP_DISCOUNT_MANAGEMENT_SUCCESS,
    APP_DISCOUNT_MANAGEMENT_FAIL,

    APP_EDIT_DISCOUNT_REQUEST,
    APP_EDIT_DISCOUNT_SUCCESS,
    APP_EDIT_DISCOUNT_FAIL
} from '../constants'


const initialState = {
    error: undefined,
    loading: false,
    discountDetails: undefined,
    editDiscount: undefined
}

export default (state = initialState, action) => {

    // console.log("APP_LOGIN_REQUEST:state:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", action.type);

    switch (action.type) {
        case APP_DISCOUNT_MANAGEMENT_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_DISCOUNT_MANAGEMENT_FAIL:
            return { ...state, error: action.error, loading: false }

        case APP_DISCOUNT_MANAGEMENT_SUCCESS:

            return {
                ...state,
                loading: false,
                discountDetails: { ...state.discountDetails, ...action.payload }
            }

        case APP_EDIT_DISCOUNT_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_EDIT_DISCOUNT_FAIL:
            return { ...state, error: undefined, loading: false }

        case APP_EDIT_DISCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                editDiscount: action.payload
            }

        default: return state
    }
}


