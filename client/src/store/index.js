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

const register =  async (email, password, confirmPassword) => {
    try {
        const response = await Axios.post("http://localhost:5000/register", {
            email,
            password,
            confirmPassword
        }, {headers: {'Content-Type': 'application/json'}})
        localStorage.setItem("token", response.data.AccessToken)
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
    } catch (e) {
        console.log(e)
    }
}

const logout = () => {
    localStorage.clear()
    console.log(initialState)
}

const reducer = (prevState = initialState, action) => {
    console.log("PREV STATE =>", prevState)
    switch (action.type) {
        case ACTION_TYPES.REGISTER:
            register(prevState.email, prevState.password, prevState.confirmPassword)
                return {
                    ...prevState,
                    isLoggedIn: true
                }
        case ACTION_TYPES.LOGIN:
            login(prevState.email, prevState.password)
            return {
                ...prevState,
                isLoggedIn: true
            }
        case ACTION_TYPES.LOGOUT:
            logout()
            return {
                ...prevState,
                isLoggedIn: false
            }
        default:
            return {
                ...prevState,
            }
    }
}

export default createStore( reducer, applyMiddleware(thunk) );
