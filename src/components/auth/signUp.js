import React, {Component} from 'react';
import firebase, { auth } from "firebase";
import base, {firebaseApp} from "../../config/base";

class SignUp extends Component {

    state = {
        firstName: '',
        name: '',
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
        this.authenticate();

        const form = {...this.state};

        //Reset Form
        Object.keys(form).forEach(input => {
            form[input] = ''
        });
        this.setState({
            ...form
        })

    };

    authenticate = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
            console.log(user);
        });
    };


    render() {
        return (
            <div>
                <form className="simple-form" onSubmit={this.handleSubmit}>
                    <input value={this.state.firstName} onChange={this.handleChange} type="text" placeholder="Prénom" name="firstName" required/>
                    <input value={this.state.name} onChange={this.handleChange} type="text" placeholder="Nom" name="name" required />
                    <input value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email" name="email" required/>
                    <input value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" name="password" required />
                    <button className="button-form" type="submit">S'enregistrer</button>
                </form>
            </div>


        );
    }
}

export default SignUp;