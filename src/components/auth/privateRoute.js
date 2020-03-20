import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                !!auth.uid ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );

};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(PrivateRoute);