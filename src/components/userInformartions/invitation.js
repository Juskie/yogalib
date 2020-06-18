import React, {Component} from 'react';
import firebase from "firebase/app";

class Invitation extends Component {
    state = {
        email: '',
        emailError: '',
        validForm:''
    }

    handleChange = (event) => {
        this.setState({email: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const sendMailInvitation = firebase.functions().httpsCallable('sendMailInvitation');

        if (/^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(this.state.email)) {

            sendMailInvitation({
                email: this.state.email
            }).catch( error => {
                console.log(error);
            })

            this.setState({
                email: '',
                validForm: 'Invitation envoyée !'
            })

        } else {
            this.setState({emailError: 'L\'adresse email est invalide.'});
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p>Inviter un professeur sur Yogalib</p>
                    <input type="email" value={this.state.email} onChange={this.handleChange} required/>
                    {this.state.emailError.length > 0 && <span className='error'>{this.state.emailError}</span>}
                    <button type="submit">Envoyer une invitation</button>
                    {this.state.validForm ? <span>{this.state.validForm}</span> : null}
                </form>
            </>
        );
    }
}

export default Invitation;