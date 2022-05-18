import {
    MY_EARNING_REQUEST,
    MY_EARNING_SUCCESS,
    MY_EARNING_FAIL,
    PER_EARNING_REQUEST,
    PER_EARNING_SUCCESS,
    PER_EARNING_FAIL
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    listMyEarning: undefined,
    listMyPerWeekEarning: undefined
}

export default (state = initialState, action) => {

    // console.log("APP_LOGIN_REQUEST:state:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::", action.type);

    switch (action.type) {
        case MY_EARNING_REQUEST:
            return { ...state, error: undefined, loading: true }

        case MY_EARNING_FAIL:
            return { ...state, error: action.error, loading: false }

        case MY_EARNING_SUCCESS:
            return {
                ...state,
                loading: false,
                listMyEarning: { ...state.listMyEarning, ...action.payload }
            }

        case PER_EARNING_REQUEST:
            return { ...state, error: undefined, loading: true }

        case PER_EARNING_FAIL:
            return { ...state, error: action.error, loading: false }

        case PER_EARNING_SUCCESS:
            return {
                ...state,
                loading: false,
                listMyPerWeekEarning: { ...state.listMyPerWeekEarning, ...action.payload }
            }

        default: return state
    }
}




