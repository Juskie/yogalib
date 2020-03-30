import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signIn} from "../../store/actions/authActions";
import './signForm.scss';

//Se connecter
class SignIn extends Component {
    state = {
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

        this.props.signIn(this.state);

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
                        <input value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email"
                               name="email" required/>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                               placeholder="Password" name="password" required/>
                        <button className="button-primary" type="submit">Se connecter</button>
                        <div>
                            {authError ? <p>{authError}</p> : null}
                        </div>
                        <p>Mot de passe oublié ?</p>
                    </form>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: (credentials) => {
            dispatch(signIn(credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);