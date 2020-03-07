import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./signedOutLinks";

const NavBar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">YogaLib</Link>
                <SignedInLinks />
                <SignedOutLinks />
            </div>
        </nav>
    );
};

const mapStateToProps = state => {
    return {

    }
};

export default connect(mapStateToProps)(NavBar);