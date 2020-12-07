import { GET_EMPLOYEES, ERROR_REQ, SET_FAVORITE } from './types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                loadiing: false,
                error: null,
                employees: action.payload,
            }
        case SET_FAVORITE:
            return {
                ...state,
                favorites: action.payload,
                sortingFromMonth: action.sorting,
            }
        case ERROR_REQ:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
