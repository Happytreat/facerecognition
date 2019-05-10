import React from "react"
import { connect } from "react-redux"
import {
	setEmailField,
	setPasswordField,
	setUser,
	setNameField,
	setRegisterReqPending,
	setRegisterReqSuccess,
	setRegisterReqFail
} from "../../../actions"

const mapStateToProps = state => {
	return {
		emailInput: state.updateInputField.emailInput,
		passwordInput: state.updateInputField.passwordInput,
		nameInput: state.updateInputField.nameInput
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onEmailChange: event => dispatch(setEmailField(event.target.value)),
		onPasswordChange: event => dispatch(setPasswordField(event.target.value)),
		onNameChange: event => dispatch(setNameField(event.target.value)),
		loadUser: user => dispatch(setUser(user)),
		onRegisterPending: () => dispatch(setRegisterReqPending()),
		onRegisterSuccess: () => dispatch(setRegisterReqSuccess()),
		onRegisterFail: () => dispatch(setRegisterReqFail())
	}
}

class Register extends React.Component {
	onRegisterSignIn = () => {
		const {
			emailInput,
			passwordInput,
			nameInput,
			loadUser,
			onRouteChange,
			onRegisterPending,
			onRegisterSuccess,
			onRegisterFail
		} = this.props

		onRegisterPending()
		fetch("https://murmuring-plateau-15762.herokuapp.com/register", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: emailInput,
				password: passwordInput,
				name: nameInput
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					onRegisterSuccess()
					loadUser(user)
					onRouteChange("home")
				} else {
					onRegisterFail()
					alert("Details cannot be empty.")
				}
			})
	}

	render() {
		const { onNameChange, onEmailChange, onPasswordChange } = this.props

		return this.props.render({
			title: "Register",
			inputLabels: ["Name", "Email", "Password"],
			inputMethods: [onNameChange, onEmailChange, onPasswordChange],
			buttonLabels: ["Sign In"],
			buttonMethods: [this.onRegisterSignIn]
		})
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register)

// render() {
// 	return (
// 		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
// 			<main className='pa4 black-80'>
// 				<div className='measure'>
// 					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
// 						<legend className='f1 fw6 ph0 mh0'>Register</legend>
// 						<div className='mt3'>
// 							<label className='db fw6 lh-copy f6' htmlFor='name'>
// 								Name
// 							</label>
// 							<input
// 								onChange={this.onNameChange}
// 								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
// 								type='text'
// 								name='name'
// 								id='name'
// 							/>
// 						</div>
// 						<div className='mt3'>
// 							<label className='db fw6 lh-copy f6' htmlFor='email-address'>
// 								Email
// 							</label>
// 							<input
// 								onChange={this.onEmailChange}
// 								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
// 								type='email'
// 								name='email-address'
// 								id='email-address'
// 							/>
// 						</div>
// 						<div className='mv3'>
// 							<label className='db fw6 lh-copy f6' htmlFor='password'>
// 								Password
// 							</label>
// 							<input
// 								onChange={this.onPasswordChange}
// 								className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
// 								type='password'
// 								name='password'
// 								id='password'
// 							/>
// 						</div>
// 					</fieldset>
// 					<div className=''>
// 						<input
// 							onClick={this.onSubmitSignIn}
// 							className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
// 							type='submit'
// 							value='Sign in'
// 						/>
// 					</div>
// 				</div>
// 			</main>
// 		</article>
// 	)
// }
