import { createAction } from "../../utils/reducer/reducer.utils";
import { USERS_ACTION_TYPE } from './users.types';

export const fetchUsersStart = () => createAction(USERS_ACTION_TYPE.FETCH_USERS_START)

export const fetchUsersSuccess = (users) => createAction(USERS_ACTION_TYPE.FETCH_USERS_SUCCESS, users)

export const fetchUsersFailed = (error) => createAction(USERS_ACTION_TYPE.FETCH_USERS_FAILED, error)

export const fetchUsersAsync = () => async (dispatch) => {
    dispatch(fetchUsersStart())

    try {
        const response = await fetch(`https://reqres.in/api/users`)
        const data = await response.json()
        dispatch(fetchUsersSuccess(data.data))
    } catch (error) {
        dispatch(fetchUsersFailed(error))
    }
}