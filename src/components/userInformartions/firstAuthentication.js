import React from 'react';
import {connect} from "react-redux";
import firstFormProf from './firstFormProf';
import firstFormStudio from './firstFormStudio';

const FirstAuthentication = (props) => {

    const firstForm = props.profile.role === 'teacher' ? <firstFormProf/> : <firstFormStudio/>;

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