import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { usersReducer } from "./users/users.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer
})