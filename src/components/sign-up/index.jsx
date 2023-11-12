import { useState } from "react";
import { Button } from "../UI/button";
import { FormInput } from "../form-input";
import "./sign-up.styles.scss";
import { useNavigate } from "react-router-dom";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const SignUp = () => {
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState(defaultFormField);
    const [visible, setVisible] = useState(false);
    const [visibleForConfirmPass, setVisibleForConfirmPass] = useState(false);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    };

    const showAndHidePassword = () => {
        setVisible(!visible);
    };

    const showAndHideConfirmPassword = () => {
        setVisibleForConfirmPass(!visibleForConfirmPass);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.length < 6) {
            alert("Пароль должен содержать минимум 6 символов");
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            navigate("/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already use");
            } else {
                console.log("User creation encountered an error", error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleChangeAuth = () => {
        navigate("/auth");
    };

    return (
        <div className="sign-up-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Имя"
                    type="text"
                    required
                    placeholder="Артур"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />
                <FormInput
                    label="Электронная почта"
                    type="email"
                    required
                    placeholder="example@mail.ru"
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Пароль"
                    type={visible ? "text" : "password"}
                    required
                    placeholder="******"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    visible={showAndHidePassword}
                    nameForShowPass="password"
                />
                <FormInput
                    label="Подтвердите пароль"
                    type={visibleForConfirmPass ? "text" : "password"}
                    required
                    placeholder="******"
                    onChange={handleChange}
                    visible={showAndHideConfirmPassword}
                    name="confirmPassword"
                    value={confirmPassword}
                    nameForShowPass="confirmPassword"
                />
                <Button>Зарегистрироваться</Button>
            </form>
            <div className="sign-up-info">
                <p>
                    Есть аккаунт? <span onClick={handleChangeAuth}>Войти</span>
                </p>
            </div>
        </div>
    );
};
