import React, { useState } from "react";
import { Link } from "react-router-dom";

import { setCurrentUser, setToken } from "../services/auth";

import Input from "../components/Input";
import Page from "../components/Page";
import api from "../services/api";

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabled(true);

        const formData = new FormData(e.target);

        api.post(`/auth/login`, formData)
            .then(function (response) {
                setToken(response.data.access_token);
                setCurrentUser(response.data.user);

                props.history.push("/books");
            })
            .catch(function (error) {
                setDisabled(false);

                if ("errors" in error.response.data) {
                    setErrors(error.response.data);
                } else if ("message" in error.response.data) {
                    setMessage(error.response.data.message);
                }
            });
    };

    const footer = (
        <div className="text-center">
            Don't have a user?{" "}
            <Link to="/register">
                <strong>register here</strong>
            </Link>
        </div>
    );

    return (
        <Page title="Login" footer={footer} lg={5}>
            <div
                className={
                    message !== ""
                        ? "alert alert-danger"
                        : "d-none alert alert-danger"
                }
            >
                {message}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <Input
                        autoFocus
                        disabled={disabled}
                        autoComplete="username"
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        className="form-control"
                        errors={errors}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        disabled={disabled}
                        autoComplete="new-password"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        className="form-control"
                        errors={errors}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <button
                    disabled={disabled}
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>
            </form>
        </Page>
    );
};

export default Login;
