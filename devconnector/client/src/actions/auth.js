import axios from 'axios'
import {setAlert} from "./alert"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT,
    CLEAR_PROFILE,
} from "./types"
import {makeBody, makeConfig} from "./axios.config"
import setAuthToken from "../utils/setAuthToken"


// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}
// Register User
export const register = ({name, email, password}) => async dispatch => {
    const config = makeConfig()
    const body = makeBody({name, email, password})

    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const login = (email, password) => async dispatch => {
    const config = makeConfig()
    const body = makeBody({email, password})

    try {
        const res = await axios.post('/api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e) {
        const errors = e.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout / Clear profile
export const logout = () => dispatch => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}