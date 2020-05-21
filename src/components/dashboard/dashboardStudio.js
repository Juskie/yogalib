import React from 'react';
import './dashboard.scss';
import Invitation from "../userInformartions/invitation";

const DashboardStudio = (props) => {

    const {profile} = props;

    return (
        <div className='dashboard-studio'>
            <section className='section-welcome'>
                <div className='section-welcome-text'>
                    <h2>Bienvenue,</h2>
                    <h1>{profile.firstName} !</h1>
                    <button className="button-white">Faire une recherche de remplacement</button>
                </div>
                <img src="" alt=""/>
            </section>
            <section className='section-saveSearch'>
                <h3>Recherches enregistrées</h3>
                <div></div>
            </section>
            <section className='section-oldSearch'>
                <h3>Historique des recherches</h3>
                <div></div>
            </section>
            <Invitation/>
        </div>
    );
};

export default DashboardStudio;