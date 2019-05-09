import { CHANGE_EMAIL_FIELD, CHANGE_PASSWORD_FIELD, CHANGE_NAME_FIELD } from "./constants"

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
		default:
			return state
	}
}
