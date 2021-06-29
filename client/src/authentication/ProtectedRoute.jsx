import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const Auth = new AuthService();
    const authority = Auth.getAuthority();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!Auth.isTokenExpired(Auth.getToken())) {
                    if (authority === rest.authorization || authority === "patient") {
                        return <Component {...props} />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/patient",
                                    state: {
                                        from: props.location,
                                    },
                                }}
                            />
                        );
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
export default ProtectedRoute;
