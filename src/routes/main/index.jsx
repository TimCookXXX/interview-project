import { Header } from "../../components/header";
import { UsersList } from "../../components/users-list";
import "./main.styles.scss";

export const Main = () => {
    return (
        <div className="main-container">
            <Header />
            <UsersList />
        </div>
    );
};
