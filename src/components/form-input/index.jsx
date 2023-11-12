import { useState } from "react";
import "./form-input.styles.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const FormInput = ({ label, ...otherProps }) => {
    const [showPassIcon, setShowPassIcon] = useState(true);
    const { visible, nameForShowPass, ...rest } = otherProps;

    const handleToggleShowPassIcon = () => {
        setShowPassIcon(!showPassIcon);
        visible();
    };

    return (
        <div className="group">
            <label>{label}</label>
            <input {...rest} />
            {nameForShowPass === "password" ||
            nameForShowPass === "confirmPassword" ? (
                <div
                    onClick={handleToggleShowPassIcon}
                    className="password-toggle"
                >
                    {showPassIcon ? <FaEye /> : <FaEyeSlash />}
                </div>
            ) : null}
        </div>
    );
};
