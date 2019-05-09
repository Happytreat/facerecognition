import React from "react"
import { connect } from "react-redux"
import { setEmailField, setPasswordField } from "../../../actions"

// const initialState = {
// 	signInEmail: "",
// 	signInPassword: ""
// }

const mapStateToProps = state => {
	return {
		emailInput: state.emailInput,
		passwordInput: state.passwordInput
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onEmailChange: event => dispatch(setEmailField(event.target.value)),
		onPasswordChange: event => dispatch(setPasswordField(event.target.value))
	}
}

class Signin extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = initialState
	// }

	// onEmailChange = event => {
	// 	this.setState({ signInEmail: event.target.value })
	// }

	// onPasswordChange = event => {
	// 	this.setState({ signInPassword: event.target.value })
	// }

	onSubmitSignIn = () => {
		console.log("In Sign in.")
		fetch("https://murmuring-plateau-15762.herokuapp.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.props.emailInput,
				password: this.props.passwordInput
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange("home")
				}
			})
	}

	render() {
		const { onEmailChange, onPasswordChange, onRouteChange } = this.props

		return this.props.render({
			title: "Sign In",
			inputLabels: ["Email", "Password"],
			inputMethods: [onEmailChange, onPasswordChange],
			buttonLabels: ["Sign In", "Register"],
			buttonMethods: [this.onSubmitSignIn, () => onRouteChange("register")]
		})
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signin)
//export default Signin
