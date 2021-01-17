import React, { useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Input from "../components/Input";
import Page from "../components/Page";

const Register = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);

    const footer = (
        <div className="text-center">
            &larr; Back to{" "}
            <Link to="/">
                <strong>login</strong>
            </Link>
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabled(true);

        const formData = new FormData(e.target);

        api.post(`/user`, formData)
            .then(function (response) {
                $("form").hide();
                $(".alert-success").removeClass("d-none");
            })
            .catch(function (error) {
                setDisabled(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data);
                }
            });
    };

    return (
        <Page title="Register" footer={footer} lg={5}>
            <div className="d-none alert alert-success mb-0">
                Successfully registered user, you can now log into our
                application.
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                        disabled={disabled}
                        autoFocus
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={name}
                        errors={errors}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <Input
                        disabled={disabled}
                        autoComplete="username"
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={email}
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
                        className="form-control"
                        value={password}
                        errors={errors}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirmation">
                        Password Confirmation
                    </label>
                    <input
                        disabled={disabled}
                        autoComplete="new-password"
                        type="password"
                        id="password-confirmation"
                        name="password_confirmation"
                        className="form-control"
                        value={passwordConfirmation}
                        errors={errors}
                        onChange={(e) => {
                            setPasswordConfirmation(e.target.value);
                        }}
                    />
                </div>

                <button
                    disabled={disabled}
                    type="submit"
                    className="btn btn-primary"
                >
                    Register
                </button>
            </form>
        </Page>
    );
};

export default Register;
