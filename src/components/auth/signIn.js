import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signIn} from "../../store/actions/authActions";
import LoadingButton from "../layout/loadingButton";
import './signForm.scss';

//Se connecter
class SignIn extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({loading: true});
        await this.props.signIn(this.state);
        this.setState({loading: false});
    };


    render() {
        const {authError, auth} = this.props;
        const {email, password} = this.state;

        if (auth.uid) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <>
                <section className="container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label>E-mail</label>
                        <input value={email} onChange={this.handleChange} type="email"
                               name="email" required/>
                        <label>Mot de Passe</label>
                        <input value={password} onChange={this.handleChange} type="password"
                               name="password" required/>
                        <LoadingButton loading={this.state.loading}>Se connecter</LoadingButton>
                        <a href="/">Mot de passe oublié ?</a>
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