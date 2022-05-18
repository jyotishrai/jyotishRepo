import {
    APP_LISTCOUPONCODE_REQUEST,
    APP_LISTCOUPONCODE_SUCCESS,
    APP_LISTCOUPONCODE_FAIL
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    listCouponCode: undefined
}

export default (state = initialState, action) => {

    // console.log("APP_LOGIN_REQUEST:state:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", action.type);

    switch (action.type) {
        case APP_LISTCOUPONCODE_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_LISTCOUPONCODE_FAIL:
            return { ...state, error: action.error, loading: false }

        case APP_LISTCOUPONCODE_SUCCESS:

            return {
                ...state,
                loading: false,
                listCouponCode: { ...state.listCouponCode, ...action.payload }
            }

        default: return state
    }
}




