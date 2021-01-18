import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

const Page = (props) => {
    const { md, lg } = props;

    const currentUser = getCurrentUser();

    useEffect(() => {
        document.title = `${props.title} | Atlântico Fullstack Challenge`;
    });

    return (
        <div>
            <div className="text-center mt-5">
                <img src="https://www.atlantico.com.br/wp-content/themes/atlantico/img/logo.png" />
            </div>

            <div className="container">
                <div className="row mt-5">
                    <div
                        className={`col-12 col-md-${md ? md : 12} col-lg-${
                            lg ? lg : 12
                        }`}
                        style={{ margin: "0 auto" }}
                    >
                        <div className="card">
                            {props.menu && (
                                <div className="card-header bg-transparent">
                                    <div className="row">
                                        <div className="col">{props.menu}</div>
                                        <div className="col-5 text-right">
                                            Welcome,{" "}
                                            <strong>{currentUser.name}</strong>
                                            <Link to="/logout" className="ml-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Logout
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="card-body">{props.children}</div>

                            {props.footer && (
                                <div className="card-header">
                                    {props.footer}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
