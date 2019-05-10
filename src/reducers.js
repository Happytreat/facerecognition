import {
	CHANGE_EMAIL_FIELD,
	CHANGE_PASSWORD_FIELD,
	CHANGE_NAME_FIELD,
	CHANGE_IMAGE_URL_FIELD,
	LOAD_USER,
	INCREMENT_USER_ENTRIES
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
			return Object.assign({}, state, { user: action.payload })
		default:
			return state
	}
}
