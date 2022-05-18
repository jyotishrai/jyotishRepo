import {
    CHANGE_RESTRO_ONLINE_STATUS_REQUEST,
    CHANGE_RESTRO_ONLINE_STATUS_SUCCESS,
    CHANGE_RESTRO_ONLINE_STATUS_FAIL,
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    restoOnlineStatus: undefined
}

export default (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_RESTRO_ONLINE_STATUS_REQUEST:
            return { ...state, error: undefined, loading: true }

        case CHANGE_RESTRO_ONLINE_STATUS_FAIL:
            return { ...state, error: action.error, loading: false }

        case CHANGE_RESTRO_ONLINE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                restoOnlineStatus: { ...state.restoOnlineStatus, ...action.payload }
            }

        default: return state
    }
}




