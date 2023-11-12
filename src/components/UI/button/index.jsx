import "./button.styles.scss";

export const Button = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
};
