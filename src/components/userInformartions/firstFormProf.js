import React, {Component} from 'react';
import {addFirstUserInformations} from "../../store/actions/userInformationsActions";
import {connect} from "react-redux";

class FirstFormProf extends Component {

    state = {
        yogaStyle: '',
        experience: '',
        language: 'Français',
        instagram: '',
        facebook: '',
        website: '',
        presentation: ''
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addFirstUserInformations(this.state);
    };

    render() {
        return (
            <>
                <section className="container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label>Style(s) de yoga enseigné(s)</label>
                        <select value={this.state.yogaStyle} name="yogaStyle" onChange={this.handleChange}>
                            <option value="Vinyasa">Vinyasa</option>
                            <option value="Hatha">Hatha</option>
                            <option value="Hatha Flow">Hatha Flow</option>
                            <option value="Yin">Yin</option>
                            <option value="Hip Hop Vinyasa">Hip-Hop Vinyasa</option>
                        </select>
                        <label>Expérience</label>
                        <select value={this.state.experience} name="experience" onChange={this.handleChange}>
                            <option value="-3">&lt; 3 ans</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                        <label>Langue(s) parlée(s)</label>
                        <input value={this.state.language} onChange={this.handleChange} type="text"
                               name="language" required/>
                        <label>Instagram</label>
                        <input value={this.state.instagram} onChange={this.handleChange} type="text"
                               name="instagram" required/>
                        <label>Facebook</label>
                        <input value={this.state.facebook} onChange={this.handleChange} type="text"
                               name="facebook" required/>
                        <label>Website</label>
                        <input value={this.state.website} onChange={this.handleChange} type="text"
                               name="website"/>
                        <textarea value={this.state.presentation} onChange={this.handleChange} name="presentation"/>
                        <button className="button-primary" type="submit">Se connecter</button>
                    </form>
                </section>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFirstUserInformations: (informations) => dispatch(addFirstUserInformations(informations))
    }
};

export default connect(null, mapDispatchToProps)(FirstFormProf);