import { USERS_ACTION_TYPE } from './users.types';

const INITIAL_STATE = {
    users: [],
    isLoading: false,
    error: null,
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USERS_ACTION_TYPE.FETCH_USERS_START:
            return {
                ...state,
                isLoading: true
            }
        case USERS_ACTION_TYPE.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                isLoading: false
            }
        case USERS_ACTION_TYPE.FETCH_USERS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
            case USERS_ACTION_TYPE.FETCH_USERS_NEXT_PAGE:
                return {
                    ...state,
                }
        default:
            return state
    }
}