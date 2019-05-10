import React, { Component } from "react"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import FaceRecognition from "../components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm"
import { setImageUrlField, incrementUserEntries } from "../actions"
import { connect } from "react-redux"

const initialState = {
	box: {}
}

const mapStateToProps = state => {
	return {
		imageUrl: state.updateInputField.imageUrl,
		user: state.updateUser.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInputChange: event => dispatch(setImageUrlField(event.target.value)),
		updateUserEntries: count => dispatch(incrementUserEntries(count))
	}
}

class Dashboard extends Component {
	constructor() {
		super()
		this.state = initialState
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
		//console.log(box)
		this.setState({ box: box })
	}

	onPictureSubmit = () => {
		fetch("https://murmuring-plateau-15762.herokuapp.com/imageurl", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: this.props.imageUrl
			})
		})
			.then(response => response.json())
			.then(response => {
				//console.log("Clarifai response", response)
				this.displayFaceBox(this.calculateFaceLocation(response))
				if (response) {
					fetch("https://murmuring-plateau-15762.herokuapp.com/image", {
						method: "put",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: this.props.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							this.props.updateUserEntries(count)
							//this.setState(Object.assign(this.state.user, { entries: count }))
						})
						.catch(console.log)
				}
			})
			.catch(err => console.log(err))
	}

	render() {
		const { imageUrl, box } = this.state
		const { onInputChange, user } = this.props
		return (
			<div>
				<Logo />
				<Rank name={user.name} entries={user.entries} />
				<ImageLinkForm onInputChange={onInputChange} onPictureSubmit={this.onPictureSubmit} />
				<FaceRecognition box={box} imageUrl={imageUrl} />
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
