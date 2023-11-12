import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";

export const Protected = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) {
        return <Navigate to={`/auth`} replace />;
    }

    return children;
};
