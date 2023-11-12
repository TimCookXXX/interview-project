import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync } from "../../store/users/users.action";
import { UsersItem } from "../users-item";
import "./user-list.styles.scss";
import { useEffect } from "react";
import {
    selectUsers,
    selectUsersIsLoading,
} from "../../store/users/users.selector";
import { Spinner } from "../spinner";

export const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isLoading = useSelector(selectUsersIsLoading);
    console.log(isLoading);

    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    return (
        <div className="users-list-container">
            {isLoading ? (
                <Spinner />
            ) : (
                users.map((user) => <UsersItem key={user.id} user={user} />)
            )}
        </div>
    );
};
