import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../components/sign-in";
import "./authentication.styles.scss";
import { selectCurrentUser } from "../../store/user/user.selector";
import { SignUp } from "../../components/sign-up";
import { useEffect } from "react";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "../../store/user/user.action";
import { Navigate, useLocation } from "react-router-dom";

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
