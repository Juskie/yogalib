import React, {Component} from 'react';
import firebase, {auth} from "firebase";
import {firebaseApp} from "../../config/base";
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import './signForm.scss';
import {Redirect} from "react-router-dom";

const validFormRegex = {
    firstName: '',
    lastName: '',
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: '',
    telephone: (/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/g)
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
        error: ''
    };

    validate = (field) => {
        // let input = !validTel.test(field) ? this.setState({error: 'invalid'}) : '';
        console.log(field);
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });

        this.validate(value);
    };

    handleSubmit = event => {
        event.preventDefault();

        const {password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert('Ta mère')
        } else {
            this.props.signUp(this.state);//send informations for the new user
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

        if (auth.uid) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <>
                <section className="container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input value={this.state.firstName} onChange={this.handleChange} type="text"
                               placeholder="Prénom" name="firstName" required/>
                        <input value={this.state.lastName} onChange={this.handleChange} type="text" placeholder="Nom"
                               name="lastName" required/>
                        <input value={this.state.phone} onChange={this.handleChange} type="text" placeholder="Téléphone"
                               name="phone" required/>
                        {this.state.error ? this.state.error : ''}
                        <input value={this.state.email} onChange={this.handleChange} type="email"
                               placeholder="Adresse Email"
                               name="email" required/>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               placeholder="Mot de Passe" name="password" required/>
                        <p>Minimum 6 caractères</p>
                        <input value={this.state.confirmPassword} onChange={this.handleChange} type="password"
                               placeholder="Confirmer le Mot de Passe" name="confirmPassword" required/>
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