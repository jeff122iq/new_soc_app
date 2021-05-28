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
    isLoggedIn: false,
    posts: []
}

const createPost = async (title, description) => {
    const token = localStorage.getItem("token")
    try {
        const post = await Axios.post("http://localhost:5000/create-post", {title, description}, {headers: {
                'Authorization': `Bearer ${token}`
            }})
        const result = post.data
        return initialState.posts.push(result)
    } catch (e) {
        console.log(e)
    }
}

const getPosts = async() => {
    try {
        const token = localStorage.getItem("token")
        const dbPosts = await Axios.get("http://localhost:5000/posts", {headers: {
                'Authorization': `Bearer ${token}`}})
        initialState.posts.length = 0
        dbPosts.data.map(item => {
            initialState.posts.push(item)
        })
        console.log("GET_POSTS", initialState.posts)
    } catch(e) {
        console.log(e)
        return null
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
        return response.data
    } catch (e) {
        console.log(e)
        return null
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
        return response.data
    } catch (e) {
        console.log(e)
        return e
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
                ...prevState,
                posts: prevState.posts
            }
        case ACTION_TYPES.GET_POSTS:
            getPosts()
            return {
                ...prevState,
                posts: prevState.posts
            }
        default:
            return {
                ...prevState,
            }
    }
}

export default createStore(reducer, applyMiddleware(thunk));
