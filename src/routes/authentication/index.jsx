import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../components/sign-in";
import { SignUp } from "../../components/sign-up";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";
import "./authentication.styles.scss";

export const Authentication = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    }, [dispatch]);
    const currentUser = useSelector(selectCurrentUser);
    return (
        <div className="authentication-page">
            {currentUser ? (
                <Navigate to={`/`} replace />
            ) : location.pathname === "/auth/sign-up" ? (
                <SignUp />
            ) : (
                <SignIn />
            )}
        </div>
    );
};
