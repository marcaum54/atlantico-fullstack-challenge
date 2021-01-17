import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Books from "./pages/Books";
import BookUserHistory from "./pages/BookUserHistory";
import Checkout from "./pages/Checkout";

import { isAuthenticated } from "./services/auth";

const GuestRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Redirect
                    to={{
                        pathname: "/books",
                        state: { from: props.location },
                    }}
                />
            ) : (
                <Component {...props} />
            )
        }
    />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                />
            )
        }
    />
);

const App = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <GuestRoute exact path="/" component={Login} />
                <GuestRoute exact path="/register" component={Register} />

                <Route exact path="/logout" component={Logout} />

                <PrivateRoute path="/books" component={Books} />
                <PrivateRoute path="/my-books" component={BookUserHistory} />
                <PrivateRoute path="/checkout" component={Checkout} />

                <Route
                    path="*"
                    component={() => <h1>404 - Page not found</h1>}
                />
            </Switch>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
