import { useEffect } from "react";
import { logout } from "../services/auth";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
    useEffect(() => {
        logout();
    });

    return <Redirect to="/"></Redirect>;
};

export default Logout;
