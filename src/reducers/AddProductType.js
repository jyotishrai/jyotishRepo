import {
    APP_ADD_CATEGORY_REQUEST,
    APP_ADD_CATEGORY_SUCCESS,
    APP_ADD_CATEGORY_FAIL,

    APP_EDIT_CATEGORY_REQUEST,
    APP_EDIT_CATEGORY_SUCCESS,
    APP_EDIT_CATEGORY_FAIL
} from '../constants'

const initialState = {
    error: undefined,
    loading: false,
    addCategory: undefined
}

export default (state = initialState, action) => {

    switch (action.type) {

        case APP_ADD_CATEGORY_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_ADD_CATEGORY_FAIL:
            return { ...state, error: undefined, loading: false }

        case APP_ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                addCategory: { ...state.addCategory, ...action.payload }
            }

        case APP_EDIT_CATEGORY_REQUEST:
            return { ...state, error: undefined, loading: true }

        case APP_EDIT_CATEGORY_FAIL:
            return { ...state, error: undefined, loading: false }

        case APP_EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                addCategory: { ...state.editCategory, ...action.payload }
            }

        default: return state
    }
}