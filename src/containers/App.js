import React, { Component } from "react"
import { Route, Redirect, withRouter, Switch } from "react-router-dom"
import Particles from "react-particles-js"
import Navigation from "../components/Navigation/Navigation"
import Form from "../components/Form/Form"
import Signin from "../components/Form/Signin/Signin"
import Register from "../components/Form/Register/Register"
import Dashboard from "./Dashboard"
import { setSignOut, clearInputField, clearUser } from "../actions"
import Loader from "react-loader-spinner"
import ParticleOptions from "./Particle"
import { connect } from "react-redux"
import "./App.css"

const mapStateToProps = state => {
	return {
		isPending: state.updateAppStatus.isPending,
		isSignedIn: state.updateAppStatus.isSignedIn
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSignOut: () => dispatch(setSignOut()),
		onClearInput: () => dispatch(clearInputField()),
		onClearUsers: () => dispatch(clearUser())
	}
}

class App extends Component {
	constructor() {
		super()
		this.routeChange = this.routeChange.bind(this)
	}

	routeChange(route) {
		let path = `/`
		if (route === "register") {
			path = `/register`
		} else if (route === "home") {
			path = `/dashboard`
		} else if (route === "signout") {
			path = `/`
			this.props.onSignOut()
			this.props.onClearInput()
			this.props.onClearUsers()
		}
		this.props.history.push(path)
	}

	render() {
		//const { route } = this.state
		const { isPending, isSignedIn } = this.props
		return (
			<div className='App'>
				<Particles className='particles' params={ParticleOptions} />
				<Navigation onRouteChange={this.routeChange} isSignedIn={isSignedIn} />
				{isPending ? (
					<div className='centered'>
						<Loader type='Hearts' color='#FFF340' height={100} width={100} />
					</div>
				) : (
					<Switch>
						<Route
							exact
							path='/'
							render={() =>
								isSignedIn ? (
									<Redirect to='/dashboard' />
								) : (
									<Signin
										onRouteChange={this.routeChange}
										render={({ title, inputLabels, inputMethods, buttonLabels, buttonMethods }) => (
											<Form
												title={title}
												inputLabels={inputLabels}
												inputMethods={inputMethods}
												buttonLabels={buttonLabels}
												buttonMethods={buttonMethods}
											/>
										)}
									/>
								)
							}
						/>
						<Route
							exact
							path='/dashboard'
							render={() => (!isSignedIn ? <Redirect to='/' /> : <Dashboard />)}
						/>
						<Route
							exact
							path='/register'
							render={() =>
								isSignedIn ? (
									<Redirect to='/dashboard' />
								) : (
									<Register
										onRouteChange={this.routeChange}
										render={({ title, inputLabels, inputMethods, buttonLabels, buttonMethods }) => (
											<Form
												title={title}
												inputLabels={inputLabels}
												inputMethods={inputMethods}
												buttonLabels={buttonLabels}
												buttonMethods={buttonMethods}
											/>
										)}
									/>
								)
							}
						/>
					</Switch>
				)}
			</div>
		)
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
)
