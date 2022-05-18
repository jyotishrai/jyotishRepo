import {
    LIST_SIGNUP_CATEGORY_REQUEST,
    LIST_SIGNUP_CATEGORY_SUCCESS,
    LIST_SIGNUP_CATEGORY_FAIL,
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    listSignupCategories: undefined
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LIST_SIGNUP_CATEGORY_REQUEST:
            return { ...state, error: undefined, loading: true }

        case LIST_SIGNUP_CATEGORY_FAIL:
            return { ...state, error: action.error, loading: false }

        case LIST_SIGNUP_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                listSignupCategories: action.payload
            }
        default: return state
    }
}




