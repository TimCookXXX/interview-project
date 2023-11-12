import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../form-input";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { Button } from "../UI/button";
import "./sign-in.styles.scss";

const defaultFormField = {
    email: "",
    password: "",
};

export const SignIn = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormField);
    const [visible, setVisible] = useState(false);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    };

    const showAndHidePassword = () => {
        setVisible(!visible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            navigate("/");
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-login-credentials":
                    alert("Не верный логин или пароль");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleChangeAuth = () => {
        navigate("/auth/sign-up");
    };

    return (
        <div className="sign-in-container">
            <h2>Войти</h2>
            <form onSubmit={handleSubmit}>
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
                <Button>Войти</Button>
            </form>
            <div className="sign-in-info">
                <p>
                    Нет аккаунта?
                    <span onClick={handleChangeAuth}>Зарегистрируйтесь</span>
                </p>
            </div>
        </div>
    );
};
