import React, {Component} from 'react';
import firebase, {auth} from "firebase";
import {firebaseApp} from "../../config/base";
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import './signForm.scss';
import {Redirect} from "react-router-dom";


//S'inscrire
class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.signUp(this.state); //envoi les informations du nouvel user

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
                        <input value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email"
                               name="email" required/>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               placeholder="Password" name="password" required/>
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