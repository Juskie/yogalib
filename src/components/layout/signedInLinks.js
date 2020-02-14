import React from 'react';
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Planning</NavLink></li>
            <li><NavLink to='/'>Se déconnecter</NavLink></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">CM</NavLink></li>
        </ul>
    );
};

export default SignedInLinks;