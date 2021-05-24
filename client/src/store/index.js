import {applyMiddleware, createStore} from "redux"
import Axios from "axios"
import thunk from "redux-thunk"
import {ACTION_TYPES} from "../actions/actionTypes";

const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    isLoggedIn: false
}

const register = async (email, password, confirmPassword) => {
    try {
        const response = await Axios.post("http://localhost:5000/register", {
            email,
            password,
            confirmPassword
        }, {headers: {'Content-Type': 'application/json'}})
        console.log(response.data)
    } catch (e) {
        console.log(e)
    }
}

const login = async (email, password) => {
    try {
        const response = await Axios.post("http://localhost:5000/login", {email, password})
        console.log(response.data)
        localStorage.setItem("token", response.data.AccessToken)
        // todo dispatch change isLoggedIn var
    } catch (e) {
        console.log(e)
    }
}

const reducer = async (prevState = initialState, action) => {
    console.log("PREV STATE =>", prevState)
    switch (action.type) {
        case ACTION_TYPES.REGISTER:
            await register(prevState.email, prevState.password, prevState.confirmPassword)
            return
        case ACTION_TYPES.LOGIN:
            await login(prevState.email, prevState.password)
            return
        default:
            return prevState
    }
}

export default createStore( reducer, applyMiddleware(thunk) );
