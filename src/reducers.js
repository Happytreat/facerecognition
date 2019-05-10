import {
	CHANGE_EMAIL_FIELD,
	CHANGE_PASSWORD_FIELD,
	CHANGE_NAME_FIELD,
	CHANGE_IMAGE_URL_FIELD,
	LOAD_USER,
	INCREMENT_USER_ENTRIES,
	SIGNIN_REQUEST_PENDING,
	SIGNIN_REQUEST_SUCCESS,
	SIGNIN_REQUEST_FAILED,
	REGISTER_REQUEST_PENDING,
	REGISTER_REQUEST_SUCCESS,
	REGISTER_REQUEST_FAILED,
	SIGN_OUT,
	CLEAR_INPUT_FIELD,
	CLEAR_USER
} from "./constants"

const initialFormState = {
	emailInput: "",
	passwordInput: "",
	nameInput: ""
}

export const updateInputField = (state = initialFormState, action = {}) => {
	switch (action.type) {
		case CHANGE_EMAIL_FIELD:
			return Object.assign({}, state, { emailInput: action.payload })
		case CHANGE_PASSWORD_FIELD:
			return Object.assign({}, state, { passwordInput: action.payload })
		case CHANGE_NAME_FIELD:
			return Object.assign({}, state, { nameInput: action.payload })
		case CHANGE_IMAGE_URL_FIELD:
			return Object.assign({}, state, { imageUrl: action.payload })
		case CLEAR_INPUT_FIELD:
			return Object.assign({}, state, initialFormState)
		default:
			return state
	}
}

const initialUserState = {
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: ""
	}
}

export const updateUser = (state = initialUserState, action = {}) => {
	switch (action.type) {
		case LOAD_USER:
			return Object.assign({}, state, { user: action.payload })
		case INCREMENT_USER_ENTRIES:
			return Object.assign({}, state, {
				user: Object.assign({}, state.user, { entries: action.payload })
			})
		case CLEAR_USER:
			return Object.assign({}, state, initialUserState)
		default:
			return state
	}
}

const initialAppState = {
	isPending: false,
	isSignedIn: false
}

// TODO: Add isSignedIn and isSignedInFailed
export const updateAppStatus = (state = initialAppState, action = {}) => {
	switch (action.type) {
		case SIGNIN_REQUEST_PENDING:
			console.log("Pending!")
			return Object.assign({}, state, { isPending: true })
		case SIGNIN_REQUEST_SUCCESS:
			console.log("SUCCESS!")
			return Object.assign({}, state, { isPending: false, isSignedIn: true })
		case SIGNIN_REQUEST_FAILED:
			return Object.assign({}, state, { isPending: false })
		case REGISTER_REQUEST_PENDING:
			console.log("Pending!")
			return Object.assign({}, state, { isPending: true })
		case REGISTER_REQUEST_SUCCESS:
			console.log("SUCCESS!")
			return Object.assign({}, state, { isPending: false, isSignedIn: true })
		case REGISTER_REQUEST_FAILED:
			return Object.assign({}, state, { isPending: false })
		case SIGN_OUT:
			return Object.assign({}, state, { isSignedIn: false })
		default:
			return state
	}
}
