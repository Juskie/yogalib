import React, {Component} from 'react';
import {addFirstUserInformations} from "../../store/actions/userInformationsActions";
import Select from 'react-select';
import YogaStyles from '../../data/yogaStyles';
import OptionsExperience from '../../data/optionsExperience';
import OptionsLanguage from '../../data/optionsLanguage';
import {ReactComponent as IconeInfo} from "../../images/informations.svg"
import './firstForm.scss';
import ImageUpload from './imageUpload';

import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


class FirstAuthenticationProf extends Component {

    state = {
        redirect: false,
        error: null,
        //userInformations
        yogaStyle: '',
        experience: '',
        language: '',
        instagram: '',
        facebook: '',
        website: '',
        presentation: '',
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard'/>
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

        if (value === null || value.length <= 0) {
            this.setState({
                error: 'Veuillez remplir les champs obligatoires pour valider le formulaire.'
            })
        } else {
            this.setState({
                error: null
            })
        }

        console.log(value);
        const {yogaStyle, experience, language, instagram, facebook, website, presentation} = this.state;
        let userInformations = {yogaStyle, experience, language, instagram, facebook, website, presentation};
        console.log(userInformations);
    };

    handleSubmit = event => {
        event.preventDefault();

        const {yogaStyle, experience, language, instagram, facebook, website, presentation} = this.state;
        let userInformations = {yogaStyle, experience, language, instagram, facebook, website, presentation};

        if (this.state.error === null) {

            this.props.addFirstUserInformations(userInformations);

            this.setState({
                redirect: true
            })
        }
    };

    render() {

        const optionsStyle = YogaStyles.optionsStyle;
        const optionsExperience = OptionsExperience.optionsExperience;
        const optionsLanguage = OptionsLanguage.optionsLanguage;

        const {yogaStyle, experience, language, instagram, facebook, website, presentation, error} = this.state;

        const multiSelectStyle = {
            control: (styles) => ({
                ...styles,
                backgroundColor: '#f3f3f4',
                borderSize: 0.5,
                boxShadow: 'inset 0 .0625em .125em rgba(10, 10, 10, .05)',
                borderColor: 'transparent',
                borderRadius: 10,
                padding: '0.25rem 0.75rem',
                fontSize: '0.8rem',
                fontFamily: 'inherit',
            })
        };
        const multiSelectTheme =
            theme => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: 'hsl(0,0%,90%)',
                    primary: '#F26A4B',
                    neutral0: '#FFFFFF'
                }
            });

        return (
            <>
                <section className="container">
                    <ImageUpload path='professeurs'/>
                    <form className="form-prof" onSubmit={this.handleSubmit}>
                        <h2>Mes informations</h2>
                        <div className="container-form">
                            <label>Style(s) de yoga enseigné(s)</label>
                            <div>
                                <Select
                                    placeholder="Choisissez vos options"
                                    value={yogaStyle}
                                    onChange={(value) => this.handleChangeMulti('yogaStyle', value)}
                                    options={optionsStyle}
                                    isMulti
                                    styles={multiSelectStyle}
                                    theme={multiSelectTheme}
                                />
                            </div>
                            <label>Années d'enseignement</label>
                            <Select
                                placeholder="Choisissez vos options"
                                value={experience}
                                onChange={(value) => this.handleChangeMulti('experience', value)}
                                options={optionsExperience}
                                styles={multiSelectStyle}
                                theme={multiSelectTheme}
                            />
                            <label>Langue(s) parlée(s)</label>
                            <Select
                                placeholder="Choisissez vos options"
                                value={language}
                                onChange={(value) => this.handleChangeMulti('language', value)}
                                options={optionsLanguage}
                                isMulti
                                styles={multiSelectStyle}
                                theme={multiSelectTheme}
                            />
                        </div>
                        <div className="container-form">
                            <label>Instagram</label>
                            <input value={instagram} onChange={this.handleChange} type="text"
                                   name="instagram" placeholder="@superprof"/>
                            <label>Facebook</label>
                            <input value={facebook} onChange={this.handleChange} type="text"
                                   name="facebook" placeholder="facebook.com/superprof"/>
                            <label>Website</label>
                            <input value={website} onChange={this.handleChange} type="text"
                                   name="website" placeholder="monsupersite.com"/>
                        </div>
                        <div className="container-form">
                            <label>Présentation</label>
                            <IconeInfo className="container-form--icone"/>
                            <textarea value={presentation} onChange={this.handleChange}
                                      name="presentation"/>
                        </div>
                        {this.renderRedirect()}
                        {error}
                        <button className="button-primary" type="submit">Valider</button>
                    </form>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFirstUserInformations: (informations) => dispatch(addFirstUserInformations(informations))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstAuthenticationProf);