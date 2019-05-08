import React, { Component } from "react"
import Particles from "react-particles-js"
import Clarifai from "clarifai"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import Signin from "./components/Signin/Signin"
import Register from "./components/Register/Register"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import "./App.css"

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
	apiKey: "f43b0998b19848339cf1346e1d837378"
})

const particleOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true
			}
		},
		size: {
			value: 10,
			random: true
		},
		move: {
			direction: "bottom",
			out_mode: "out"
		},
		line_linked: {
			enable: false
		}
	},
	interactivity: {
		events: {
			onclick: {
				enable: true,
				mode: "remove"
			}
		},
		modes: {
			remove: {
				particles_nb: 10
			}
		}
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			input: "",
			imageUrl: "",
			box: {},
			route: "signin",
			isSignedIn: false,
			user: {
				id: "",
				name: "",
				email: "",
				entries: 0,
				joined: ""
			}
		}
	}

	loadUser = data => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	calculateFaceLocation = data => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById("inputimage")
		const width = Number(image.width)
		const height = Number(image.height)
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		}
	}

	displayFaceBox = box => {
		console.log(box)
		this.setState({ box: box })
	}

	onInputChange = event => {
		this.setState({ input: event.target.value })
	}

	onPictureSubmit = () => {
		this.setState({ imageUrl: this.state.input })
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err))
	}

	onRouteChange = route => {
		if (route === "signout") {
			this.setState({ isSignedIn: false })
		} else if (route === "home") {
			this.setState({ isSignedIn: true })
		}
		this.setState({ route: route })
	}

	render() {
		const { isSignedIn, imageUrl, box, route } = this.state
		return (
			<div className='App'>
				<Particles className='particles' params={particleOptions} />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />

				{route === "home" ? (
					<div>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries} />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onPictureSubmit={this.onPictureSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === "signin" ? (
					<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
					<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				)}
			</div>
		)
	}
}

export default App
