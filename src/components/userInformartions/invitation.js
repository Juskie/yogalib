import React, { Component } from "react";
import firebase from "firebase/app";
import LoadingButton from "../layout/loadingButton";

class Invitation extends Component {
	state = {
		email: "",
		emailError: "",
		validForm: "",
		loading: false,
	};

	handleChange = (event) => {
		this.setState({ email: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email } = this.state;
		this.setState({ emailError: "", loading: true });

		const sendMailInvitation = firebase
			.functions()
			.httpsCallable("sendMailInvitation");
		const checkUserEmail = firebase.functions().httpsCallable("checkUserEmail");
		const isEmail = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

		if (isEmail.test(email)) {
			const emailInvitation = await checkUserEmail({
				email: email,
			}).catch((error) => {
				this.setState({
					emailError: error.message,
					loading: false,
				});
			});
			if (emailInvitation?.data) {
				await sendMailInvitation({
					email: email,
				}).catch((error) => {
					this.setState({
						emailError: error.message,
						loading: false,
					});
				});
				this.setState({
					email: "",
					validForm: "Invitation envoyée !",
					loading: false,
				});
			}
		} else {
			this.setState({
				emailError: "L'adresse email est invalide.",
				loading: false,
			});
		}
	};

	render() {
		const { email, emailError, loading, validForm } = this.state;
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<p>Inviter un professeur sur Yogalib</p>
					<input
						type="email"
						value={email}
						onChange={this.handleChange}
						required
					/>
					{emailError.length > 0 && <span className="error">{emailError}</span>}
					<LoadingButton loading={loading}>
						Envoyer une invitation
					</LoadingButton>
					{validForm ? <span>{validForm}</span> : null}
				</form>
			</>
		);
	}
}

export default Invitation;
