import React from 'react';
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/signin'>Se connecter</NavLink></li>
        </ul>
    );
};

export default SignedOutLinks;