import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersItem } from "../users-item";
import {
    selectUsers,
    selectUsersIsLoading,
    selectUsersPage,
} from "../../store/users/users.selector";
import { fetchUsersAsync } from "../../store/users/users.action";
import { Spinner } from "../spinner";
import "./user-list.styles.scss";

export const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isLoading = useSelector(selectUsersIsLoading);
    const currentPage = useSelector(selectUsersPage)
    console.log(currentPage);

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
