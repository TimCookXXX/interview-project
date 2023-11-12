import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/header";
import { Button } from "../../components/UI/button";
import { Spinner } from "../../components/spinner";
import { UserInfo } from "../../components/user-info";
import {
    selectUsers,
    selectUsersIsLoading,
} from "../../store/users/users.selector";
import { fetchUsersAsync } from "../../store/users/users.action";
import "./user.styles.scss";

export const User = () => {
    const isLoading = useSelector(selectUsersIsLoading);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);
    const handleClickReturn = () => {
        navigate("/");
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                users
                    .filter((item) => parseInt(item.id) === parseInt(id))
                    .map(({ first_name, last_name, email, avatar, id }) => (
                        <div className="user-container" key={id}>
                            <Header onClick={handleClickReturn}>
                                <Button
                                    name="buttonReturn"
                                    onClick={handleClickReturn}
                                >
                                    Назад
                                </Button>
                                <div className="user-info">
                                    <img
                                        className="user-img"
                                        src={avatar}
                                        alt={`${first_name}`}
                                    />
                                    <div className="user-desc">
                                        <h2 className="user-name">{`${first_name} ${last_name}`}</h2>
                                        <span className="user-work">
                                            Партнёр
                                        </span>
                                    </div>
                                </div>
                            </Header>
                            <UserInfo email={email} />
                        </div>
                    ))
            )}
        </>
    );
};
