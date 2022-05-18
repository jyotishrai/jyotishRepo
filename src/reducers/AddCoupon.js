import {
    APP_ADDCOUPONCODE_FAIL,
    APP_ADDCOUPONCODE_SUCCESS,
    APP_ADDCOUPONCODE_REQUEST,
    APP_EDITCOUPONCODE_REQUEST,
    APP_EDITCOUPONCODE_SUCCESS,
    APP_EDITCOUPONCODE_FAIL
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    addCouponCode: undefined,
    editCouponCode: undefined
}

export default (state = initialState, action) => {

    switch (action.type) {
        case APP_ADDCOUPONCODE_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_ADDCOUPONCODE_FAIL:
            return { ...state, error: undefined, loading: false }

        case APP_ADDCOUPONCODE_SUCCESS:
            return {
                ...state,
                loading: false,
                addCouponCode: { ...state.addCouponCode, ...action.payload }
            }
        case APP_EDITCOUPONCODE_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_EDITCOUPONCODE_FAIL:
            return { ...state, error: undefined, loading: false }

        case APP_EDITCOUPONCODE_SUCCESS:
            return {
                ...state,
                loading: false,
                addCouponCode: { ...state.editCouponCode, ...action.payload }
            }
        default: return state
    }
}