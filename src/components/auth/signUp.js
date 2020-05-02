import React, {Component} from 'react';
import firebase, {auth} from "firebase";
import {firebaseApp} from "../../config/base";
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import './signForm.scss';
import './signUp.scss';
import {Redirect} from "react-router-dom";

import Image from '../../images/img_signup.jpg'

const validFormRegex = {
    firstName: /[a-z\s.-]/i,
    lastName: /[a-z\s.-]/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: '',
    telephone: /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/g
};

//S'inscrire
class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        let errors = this.state.errors;

        console.log(errors)

        switch (name) {
            case 'firstName':
                errors.firstName =
                    validFormRegex.firstName.test(value)
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    validFormRegex.lastName.test(value)
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validFormRegex.email.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'phone':
                errors.phone =
                    validFormRegex.phone.test(value)
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    validFormRegex.phone.test(value)
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({
            [name]: value,
            errors
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {password, confirmPassword, firstName, lastName, email, phone} = this.state;
        let userInformations = {email, password, firstName, lastName, phone};

        if (password !== confirmPassword) {
            alert('Mot de passe invalide')
        } else {
            this.props.signUp(userInformations);//send informations for the new user
        }


        // const form = {...this.state};

        //Reset Form
        // Object.keys(form).forEach(input => {
        //     form[input] = ''
        // });
        // this.setState({
        //     ...form
        // })

    };


    render() {

        const {authError, auth} = this.props;
        const {password, confirmPassword, firstName, lastName, email, phone, errors} = this.state;

        if (auth.uid) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <>
                <section className="signUpContainer">
                    <img src={Image} alt=""/>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <h2>Créer mon compte Yogalib</h2>
                        <label>Prénom</label>
                        <input value={firstName} onChange={this.handleChange} type="text"
                               name="firstName" required/>
                        {errors.firstName.length > 0 &&
                        <span className='error'>{errors.firstName}</span>}
                        <label>Nom</label>
                        <input value={lastName} onChange={this.handleChange} type="text"
                               name="lastName" required/>
                        <label>Téléphone (Optionnel)</label>
                        <input value={phone} onChange={this.handleChange} type="text"
                               name="phone"/>
                        <label>E-mail</label>
                        <input value={email} onChange={this.handleChange} type="email"
                               name="email" required/>
                        <label>Mot de Passe</label>
                        <label>Minimum 6 caractères</label>
                        <input value={password} onChange={this.handleChange} type="password"
                               name="password" required/>
                        <label>Confirmer votre Mot de Passe</label>
                        <input value={confirmPassword} onChange={this.handleChange} type="password"
                               name="confirmPassword" required/>
                        <button className="button-primary" type="submit">S'enregistrer</button>
                        <div>
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </form>
                </section>
            </>


        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => {
            dispatch(signUp(newUser))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);