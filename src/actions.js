import {
	CHANGE_EMAIL_FIELD,
	CHANGE_PASSWORD_FIELD,
	CHANGE_NAME_FIELD,
	CHANGE_IMAGE_URL_FIELD,
	LOAD_USER,
	INCREMENT_USER_ENTRIES,
	SIGNIN_REQUEST_PENDING,
	SIGNIN_REQUEST_SUCCESS,
	SIGNIN_REQUEST_FAILED
} from "./constants"

export const setEmailField = text => ({
	type: CHANGE_EMAIL_FIELD,
	payload: text
})

export const setPasswordField = text => ({
	type: CHANGE_PASSWORD_FIELD,
	payload: text
})

export const setNameField = text => ({
	type: CHANGE_NAME_FIELD,
	payload: text
})

export const setImageUrlField = text => ({
	type: CHANGE_IMAGE_URL_FIELD,
	payload: text
})

export const setUser = user => ({
	type: LOAD_USER,
	payload: user
})

export const incrementUserEntries = count => ({
	type: INCREMENT_USER_ENTRIES,
	payload: count
})

export const setRequestPending = () => ({
	type: SIGNIN_REQUEST_PENDING
})

export const setRequestSuccess = () => ({
	type: SIGNIN_REQUEST_SUCCESS
})

export const setRequestFail = () => ({
	type: SIGNIN_REQUEST_FAILED
})
