import {applyMiddleware, createStore} from "redux"
import Axios from "axios"
import thunk from "redux-thunk"
import {ACTION_TYPES} from "../actions/actionTypes";

const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
    description: "",
    isLoggedIn: false
}


const createPost = async (title, description) => {
    const token = localStorage.getItem("token")
    try {
        const post = await Axios.post("http://localhost:5000/create-post", {title, description}, {headers: {
                'Authorization': `Bearer ${token}`
            }})
        console.log(post.data)
    } catch (e) {
        console.log(e)
    }
}

const getPosts = async() => {
    try {
        const token = localStorage.getItem("token")
        const posts = await Axios.get("http://localhost:5000/posts", {headers: {
                'Authorization': `Bearer ${token}`}})
        console.log(posts)
    } catch(e) {
        console.log(e)
    }
}

const register = async (username, email, password, confirmPassword) => {
    try {
        const response = await Axios.post("http://localhost:5000/register", {
            username,
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

const isAuthenticated = () => {
    localStorage.getItem("token")
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
            register(prevState.username, prevState.email, prevState.password, prevState.confirmPassword)
            if (localStorage.getItem("token")) {
                console.log("PREV_STATE =>", prevState)
                return {
                    ...prevState,
                    isLoggedIn: true
                }
            } else {
                return {
                    ...prevState,
                }
            }
        case ACTION_TYPES.LOGIN:
            login(prevState.email, prevState.password)
            if (localStorage.getItem("token")) {
                console.log("PREV_STATE =>", prevState)
                return {
                    ...prevState,
                    isLoggedIn: true
                }
            } else {
                return {
                    ...prevState,
                }
            }
        case ACTION_TYPES.IS_AUTHENTICATED:
            isAuthenticated()
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
        case ACTION_TYPES.CREATE_POST:
            createPost(prevState.title, prevState.description)
            return {
                ...prevState
            }
        case ACTION_TYPES.GET_POSTS:
            getPosts()
            return {
                ...prevState
            }
        default:
            return {
                ...prevState,
            }
    }
}

export default createStore(reducer, applyMiddleware(thunk));
