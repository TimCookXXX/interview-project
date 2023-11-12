import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) {
        return <Navigate to={`/auth`} replace />;
    }

    return children;
};
