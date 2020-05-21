import React, {Component} from 'react';
import firebase from "firebase/app";

class Invitation extends Component {
    state = {
        email: ''
    }

    handleChange = (event) => {
        this.setState({email: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const sendMailInvitation = firebase.functions().httpsCallable('sendMailInvitation');

        sendMailInvitation({
            email: this.state.email
        }).catch( error => {
            console.log(error);
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p>Inviter un professeur sur Yogalib</p>
                    <input type="email" value={this.state.email} onChange={this.handleChange}/>
                    <button type="submit">Envoyer une invitation</button>
                </form>
            </>
        );
    }
}

export default Invitation;