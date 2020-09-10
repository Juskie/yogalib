import React, { Component } from 'react';
import firebase from 'firebase/app';
import LoadingButton from '../layout/loadingButton';

class Invitation extends Component {
    state = {
      email: '',
      emailError: '',
      validForm: '',
      loading: false,
    }

    handleChange = (event) => {
      this.setState({ email: event.target.value });
    }

    handleSubmit = async (event) => {
      event.preventDefault();
      this.setState({ emailError: '', loading: true });
      const sendMailInvitation = firebase.functions().httpsCallable('sendMailInvitation');
      const checkUserEmail = firebase.functions().httpsCallable('checkUserEmail');
      const isEmail = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

      if (isEmail.test(this.state.email)) {
        const emailInvitation = await checkUserEmail({
          email: this.state.email,
        }).catch((error) => {
          this.setState({
            emailError: error.message,
            loading: false,
          });
        });
        if (emailInvitation?.data) {
          await sendMailInvitation({
            email: this.state.email,
          }).catch((error) => {
            this.setState({
              emailError: error.message,
              loading: false,
            });
          });
          this.setState({
            email: '',
            validForm: 'Invitation envoyée !',
            loading: false,
          });
        }
      } else {
        this.setState({ emailError: 'L\'adresse email est invalide.', loading: false });
      }
    }

    render() {
      return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p>Inviter un professeur sur Yogalib</p>
                    <input type="email" value={this.state.email} onChange={this.handleChange} required />
                    {this.state.emailError.length > 0 && <span className="error">{this.state.emailError}</span>}
                    <LoadingButton loading={this.state.loading}>
                        Envoyer une invitation
                    </LoadingButton>
                    {this.state.validForm ? <span>{this.state.validForm}</span> : null}
                </form>
            </>
      );
    }
}

export default Invitation;
