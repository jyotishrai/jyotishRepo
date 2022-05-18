import {
    MY_PROFILE_REQUEST,
    MY_PROFILE_SUCCESS,
    MY_PROFILE_FAIL,
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    myProfile: undefined
}

export default (state = initialState, action) => {

    switch (action.type) {
        case MY_PROFILE_REQUEST:
            return { ...state, error: undefined, loading: true }

        case MY_PROFILE_FAIL:
            return { ...state, error: action.error, loading: false }

        case MY_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                myProfile: { ...state.myProfile, ...action.payload }
            }

        default: return state
    }
}




