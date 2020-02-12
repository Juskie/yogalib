import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import firebase, {auth} from "firebase";
import base, { firebaseApp } from "../config/base";


class SignUp extends Component {

    state = {
        name: '',
        firstName: '',
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
        firebase.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
          console.log(user);
        });
    };


    render() {
        return (
            <div className="form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control value={this.state.firstName} name="firstName" onChange={this.handleChange} placeholder="Entrez votre Prénom"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control value={this.state.name} name="name" onChange={this.handleChange} placeholder="Entrez votre Nom"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={this.state.email} name="email" onChange={this.handleChange} type="email" placeholder="Entrez votre Email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control value={this.state.password} name="password" onChange={this.handleChange} type="password" placeholder="Entrez votre Mot de Passe"/>
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">
                        S'enregistrer
                    </Button>
                </Form>
            </div>
        );
    }
}

export default SignUp;