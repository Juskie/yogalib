import React from 'react';
import {connect} from "react-redux";
import FirstFormProf from "./firstFormProf";
import FirstFormStudio from "./firstFormStudio";
import './firstForm.scss';

const FirstAuthentication = (props) => {

    const firstForm = props.profile.role === 'teacher' ? <FirstFormProf/> : <FirstFormStudio/>;

    return (
        <div>
            <h2>Merci de remplir les informations suivantes pour passer à la suite !</h2>
            {firstForm}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
    }
};

export default connect(mapStateToProps)(FirstAuthentication);