import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import { updateInputField, updateUser, updateAppStatus } from "./reducers"
import "./index.css"
import App from "./containers/App"
import * as serviceWorker from "./serviceWorker"
import "tachyons"

const rootReducer = combineReducers({ updateInputField, updateUser, updateAppStatus })

const middlewares = []
if (process.env.NODE_ENV !== "development") {
	console.log(process.env.NODE_ENV)
	const { logger } = require("redux-logger")
	middlewares.push(logger)
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
