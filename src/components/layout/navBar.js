import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import './navBar.scss';

import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./signedOutLinks";

const NavBar = (props) => {
    const {auth} = props;

    let clickLogo = auth.uid ? '/dashboard' : '/';

    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;

    return (
        <header className="header">
            <nav className="nav">
                <Link to={clickLogo} className="">YogaLib</Link>
                {links}
            </nav>
        </header>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(NavBar);