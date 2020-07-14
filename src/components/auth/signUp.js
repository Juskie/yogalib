import React, {Component} from 'react';
import {auth} from "firebase";
import firebase from "firebase/app";
import {firebaseApp} from "../../config/base";
import {connect} from 'react-redux';
import {signIn, signUp} from '../../store/actions/authActions';
import './signForm.scss';
import './signUp.scss';
import {Redirect} from "react-router-dom";
import {startCase} from 'lodash';
import {toLower} from 'lodash';

const firstLetterCapitalize = (name) => {
    return startCase(toLower(name));
};

// import Image from '../../images/img_signup.jpg'

const validFormErrorRegex = {
    firstName: /[a-z\s.-]{1,30}$/i,
    lastName: /[a-z\s.-]{1,30}$/i,
    email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[#\w@_$-]{8,20}$/i,
    phone: /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/g
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
        },
        submitPassword: '',
        validFormError: ''
    };

    handleChange = event => {
        event.preventDefault();

        const {name, value} = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    validFormErrorRegex.firstName.test(value)
                        ? ''
                        : 'Prénom obligatoire';
                break;
            case 'lastName':
                errors.lastName =
                    validFormErrorRegex.lastName.test(value)
                        ? ''
                        : 'Nom obligatoire';
                break;
            case 'email':
                errors.email =
                    validFormErrorRegex.email.test(value)
                        ? ''
                        : 'Email obligatoire';
                break;
            case 'phone':
                errors.phone =
                    validFormErrorRegex.phone.test(value)
                        ? ''
                        : 'Format du téléphone incorrect';
                break;
            case 'password':
                errors.password =
                    validFormErrorRegex.password.test(value)
                        ? ''
                        : 'Mot de passe obligatoire';
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    value.length > 0
                        ? ''
                        : 'Confirmer votre Mot de Passe';
                break;
            default:
                break;
        }

        this.setState({
            [name]: value,
            errors
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        const {password, confirmPassword, firstName, lastName, email, phone} = this.state;
        const newUserSignUp = firebase.functions().httpsCallable('authentication-newUserSignUp');
        const sendMailConfirmation = firebase.functions().httpsCallable('authentication-sendMailConfirmation');

        try {
            password !== confirmPassword ?
                this.setState({submitPassword: 'Les mots de passe ne correspondent pas.'})
                : await newUserSignUp({
                    email: email.toLowerCase(),
                    password: password,
                    firstName: firstLetterCapitalize(firstName),
                    lastName: firstLetterCapitalize(lastName),
                    phone: phone
                });

            await sendMailConfirmation({
                email: this.state.email
            });

        } catch (error) {
            this.setState({
                validFormError: error.message
            })
            console.log(error.message);
        }
        this.props.signIn({email: email, password: password});
    }

    render() {

        const {authError, auth} = this.props;
        const {password, confirmPassword, firstName, lastName, email, phone, errors, submitPassword, validFormError} = this.state;

        if (auth.uid) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <>
                <section className="signUpContainer">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <h2>Créer mon compte Yogalib</h2>
                        <label>Prénom</label>
                        <input value={firstName} onChange={this.handleChange} type="text"
                               name="firstName" required/>
                        {errors.firstName.length > 0 && <span className='error'>{errors.firstName}</span>}
                        <label>Nom</label>
                        <input value={lastName} onChange={this.handleChange} type="text"
                               name="lastName" required/>
                        {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}
                        <label>Téléphone (Optionnel)</label>
                        <input value={phone} onChange={this.handleChange} type="text"
                               name="phone"/>
                        {errors.phone.length > 0 && <span className='error'>{errors.phone}</span>}
                        <label>E-mail</label>
                        <input value={email} onChange={this.handleChange} type="email"
                               name="email" required/>
                        {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                        <label>Mot de Passe</label>
                        <label>Minimum 6 caractères</label>
                        <input value={password} onChange={this.handleChange} type="password"
                               name="password" required/>
                        {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                        <label>Confirmer votre mot de passe</label>
                        <input value={confirmPassword} onChange={this.handleChange} type="password"
                               name="confirmPassword" required/>
                        {errors.confirmPassword.length > 0 && <span className='error'>{errors.confirmPassword}</span>}
                        {submitPassword ? <p>{submitPassword}</p> : null}
                        <label><input type="checkbox" id="cgu"/>J'ai lu et j'accepte les CGU</label>
                        {authError ? <p>{authError}</p> : null}
                        {validFormError.length > 0 && <span className='error'>{validFormError}</span>}
                        <button className="button-primary" type="submit" value="true">S'enregistrer</button>
                    </form>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // signUp: (newUser) => {
        //     dispatch(signUp(newUser))
        // }
        signIn: (credentials) => {
            dispatch(signIn(credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);