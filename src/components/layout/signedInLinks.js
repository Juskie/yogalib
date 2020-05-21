import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
    return (
        <ul className="nav__link">
            <li><NavLink to='/'>Planning</NavLink></li>
            <li><button onClick={props.signOut}>Se déconnecter</button></li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks);