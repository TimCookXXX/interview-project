import React, { useEffect, useState } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";
import exitIcon from "../../assets/ic_round-exit-to-app.svg";
import returnIcon from "../../assets/eva_arrow-ios-back-fill.svg";
import { Button } from "../UI/button";
import "./header.styles.scss";

export const Header = ({ children, onClick }) => {
    const getWindowWidth = () => window.innerWidth;
    const [windowWidth, setWindowWidth] = useState(getWindowWidth);

    useEffect(() => {
        const handleWindowResize = () => setWindowWidth(getWindowWidth);

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const dispatch = useDispatch();
    const signOutHandler = async () => {
        await signOutUser();
        dispatch(setCurrentUser(null));
    };

    let specificChild = null;

    React.Children.forEach(children, (child) => {
        if (child.props.name === "buttonReturn") {
            specificChild = child;
        }
    });

    let anotherChild = null;

    React.Children.forEach(children, (child) => {
        if (child.props.name !== "buttonReturn") {
            anotherChild = child;
        }
    });

    return (
        <header>
            <div className="header-container">
                <div className="button-container">
                    {specificChild ? (
                        <>
                            {windowWidth <= 468 ? (
                                <>
                                    <img
                                        onClick={onClick}
                                        style={{ cursor: "pointer" }}
                                        src={returnIcon}
                                        alt="returnIcon"
                                    />
                                    <img
                                        style={{ cursor: "pointer" }}
                                        onClick={signOutHandler}
                                        src={exitIcon}
                                        alt="ExitIcon"
                                    />
                                </>
                            ) : (
                                <>
                                    {specificChild}
                                    <Button onClick={signOutHandler}>
                                        Выход
                                    </Button>
                                </>
                            )}
                        </>
                    ) : windowWidth <= 468 ? (
                        <img
                            style={{ cursor: "pointer" }}
                            onClick={signOutHandler}
                            src={exitIcon}
                            alt="ExitIcon"
                        />
                    ) : (
                        <Button onClick={signOutHandler}>Выход</Button>
                    )}
                </div>
                {anotherChild ? (
                    anotherChild
                ) : (
                    <div className="header-content">
                        <h2 className="header-title">Наша команда</h2>
                        <p className="header-desc">
                            Это опытные специалисты, хорошо разбирающиеся во
                            всех задачах, которые ложатся на их плечи, и умеющие
                            находить выход из любых, даже самых сложных
                            ситуаций.
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
};
