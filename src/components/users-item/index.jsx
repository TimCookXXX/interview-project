import { useNavigate } from "react-router-dom";
import likeSVG from "../../assets/like.svg";
import "./users-item.styles.scss";

export const UsersItem = ({ user }) => {
    const { first_name, last_name, avatar, id } = user;
    const navigate = useNavigate();

    const handleChange = () => {
        navigate(`/user/${id}`);
    };

    return (
        <div className="users-item-container">
            <div className="users-item-info">
                <img
                    className="user-avatar"
                    onClick={handleChange}
                    src={avatar}
                    alt={`${first_name}`}
                />
                <span className="name">{`${first_name} ${last_name}`}</span>
            </div>
            <div className="like-container">
                <img src={likeSVG} alt="" />
            </div>
        </div>
    );
};
