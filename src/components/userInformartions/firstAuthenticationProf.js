import React, {Component} from 'react';
import {addFirstUserInformations} from "../../store/actions/userInformationsActions";
import Select from 'react-select';
import YogaStyles from '../../data/yogaStyles';
import OptionsExperience from '../../data/optionsExperience';
import OptionsLanguage from '../../data/optionsLanguage';
import './firstForm.scss';

import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class FirstAuthenticationProf extends Component {

    state = {
        yogaStyle: '',
        experience: '',
        language: '',
        instagram: '',
        facebook: '',
        website: '',
        presentation: '',
        redirect: false
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleChangeMulti = (input, value) => {
        this.setState({
            [input]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addFirstUserInformations(this.state);

        this.setState({
            redirect: true
        })
    };

    render() {

        const optionsStyle = YogaStyles.optionsStyle;
        const optionsExperience = OptionsExperience.optionsExperience;
        const optionsLanguage = OptionsLanguage.optionsLanguage;

        return (
            <>
                <section className="container">
                    <form className="form-prof" onSubmit={this.handleSubmit}>
                        <h2>Mes informations</h2>
                        <div className="container-form">
                            <label>Style(s) de yoga enseigné(s)</label>
                            <div>
                                <Select
                                    value={this.state.yogaStyle}
                                    onChange={(value) => this.handleChangeMulti('yogaStyle', value)}
                                    options={optionsStyle}
                                    isMulti
                                    required
                                />
                            </div>
                            <label>Années d'enseignement</label>
                            <Select
                                value={this.state.experience}
                                onChange={(value) => this.handleChangeMulti('experience', value)}
                                options={optionsExperience}
                                required
                            />
                            <label>Langue(s) parlée(s)</label>
                            <Select
                                value={this.state.language}
                                onChange={(value) => this.handleChangeMulti('language', value)}
                                options={optionsLanguage}
                                isMulti
                                required
                                // defaultValue={}
                            />
                        </div>
                        <div className="container-form">
                            <label>Instagram</label>
                            <input value={this.state.instagram} onChange={this.handleChange} type="text"
                                   name="instagram" />
                            <label>Facebook</label>
                            <input value={this.state.facebook} onChange={this.handleChange} type="text"
                                   name="facebook" />
                            <label>Website</label>
                            <input value={this.state.website} onChange={this.handleChange} type="text"
                                   name="website"/>
                        </div>
                        <div className="container-form">
                            <label>Descriptif</label>
                        <textarea value={this.state.presentation} onChange={this.handleChange}
                                  name="presentation"/>
                        </div>
                        {this.renderRedirect()}
                        <button className="button-primary" type="submit">Valider</button>
                    </form>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFirstUserInformations: (informations) => dispatch(addFirstUserInformations(informations))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstAuthenticationProf);