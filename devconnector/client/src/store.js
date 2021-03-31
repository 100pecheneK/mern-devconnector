import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootDeducer from './reducers'

const initialState = {}

const store = createStore(
    rootDeducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store