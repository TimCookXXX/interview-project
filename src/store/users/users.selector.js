import { createSelector } from "reselect"

const selectUsersReducer = (state) => state.users

export const selectUsers = createSelector(
    [selectUsersReducer],
    (usersSlice) => usersSlice.users
)

export const selectUsersIsLoading = createSelector(
    [selectUsersReducer],
    (createSlice) => createSlice.isLoading
)