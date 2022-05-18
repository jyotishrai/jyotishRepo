import {
    APP_LIST_ORDER_REQUEST,
    APP_LIST_ORDER_SUCCESS,
    APP_LIST_ORDER_FAIL,
    APP_PARAMS,
    CHANGE_ORDER_STATUS_REQUEST,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_ORDER_STATUS_FAIL
} from '../../constants'

const initalState = {
    loading: false,
    error: undefined,
    newListOrder: undefined,
    preparingListOrder: undefined,
    readyListOrder: undefined,
    pastListOrder: undefined,
    changeOrderStatus: undefined,
    newLoading: false,
    preparingLoading: false,
    readyLoading: false,
    pastLoading: false
}

export default (state = initalState, action) => {
    switch (action.type) {
        case APP_LIST_ORDER_REQUEST:
            //console.warn(action.payload.status == APP_PARAMS.STATUS_NEW_ORDER)
            return {
                ...state, error: undefined, [
                    action.payload.status == APP_PARAMS.STATUS_NEW_ORDER ? 'newLoading' :
                        action.payload.status == APP_PARAMS.STATUS_PREPARIN_ORDER ? 'preparingLoading' :
                            action.payload.status == APP_PARAMS.STATUS_READY_ORDER ? 'readyLoading' :
                                action.payload.status == APP_PARAMS.STATUS_PAST_ORDER ? 'pastLoading' :
                                    'loading'
                ]: true
            }
        case APP_LIST_ORDER_FAIL:
            return {
                ...state, error: action.error, [
                    action.payload.status == APP_PARAMS.STATUS_NEW_ORDER ? 'newLoading' :
                        action.payload.status == APP_PARAMS.STATUS_PREPARIN_ORDER ? 'preparingLoading' :
                            action.payload.status == APP_PARAMS.STATUS_READY_ORDER ? 'readyLoading' :
                                action.payload.status == APP_PARAMS.STATUS_PAST_ORDER ? 'pastLoading' :
                                    'loading'
                ]: false
            }
        case APP_LIST_ORDER_SUCCESS:

            if (action.payload[APP_PARAMS.ORDER_STATUS] != undefined &&
                action.payload[APP_PARAMS.ORDER_STATUS] == APP_PARAMS.STATUS_NEW_ORDER) {

                return {
                    ...state,
                    newLoading: false,
                    newListOrder: action.payload
                }
            }
            else if (action.payload[APP_PARAMS.ORDER_STATUS] != undefined &&
                action.payload[APP_PARAMS.ORDER_STATUS] == APP_PARAMS.STATUS_PREPARIN_ORDER) {

                return {
                    ...state,
                    preparingLoading: false,
                    preparingListOrder: action.payload
                }
            }
            else if (action.payload[APP_PARAMS.ORDER_STATUS] != undefined &&
                action.payload[APP_PARAMS.ORDER_STATUS] == APP_PARAMS.STATUS_READY_ORDER) {

                return {
                    ...state,
                    readyLoading: false,
                    readyListOrder: action.payload
                }
            }
            else if (action.payload[APP_PARAMS.ORDER_STATUS] != undefined &&
                action.payload[APP_PARAMS.ORDER_STATUS] == APP_PARAMS.STATUS_PAST_ORDER) {

                return {
                    ...state,
                    pastLoading: false,
                    pastListOrder: action.payload
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    listOrder: { ...state.listOrder, ...action.payload }
                }
            }

        case CHANGE_ORDER_STATUS_REQUEST:
            return { ...state, error: undefined, loading: true }

        case CHANGE_ORDER_STATUS_FAIL:
            return { ...state, error: undefined, loading: false }

        case CHANGE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                changeOrderStatus: { ...state.changeOrderStatus, ...action.payload }
            }
        default: return state
    }
}