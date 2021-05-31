import {applyMiddleware, createStore, combineReducers} from "redux"
import Axios from "axios"
import thunk from "redux-thunk"
import {ACTION_TYPES} from "../actions/actionTypes";

const useInitialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoggedIn: false,
}

const postInitialState = {
    title: "",
    description: "",
    posts: [],
    post: [],
}

const createPost = async (title, description) => {
    const token = localStorage.getItem("token")
    try {
        const post = await Axios.post("http://localhost:5000/create-post", {title, description}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const result = post.data
        return postInitialState.posts.push(result)
    } catch (e) {
        console.log(e)
    }
}

const getPosts = async () => {
    try {
        const token = localStorage.getItem("token")
        const dbPosts = await Axios.get("http://localhost:5000/posts", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        postInitialState.posts.length = 0
        dbPosts.data.map(item => {
            postInitialState.posts.push(item)
        })
        console.log("GET_POSTS", postInitialState.posts)
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getUserPost = async (id) => {
    try {
        const token = localStorage.getItem("token")
        const response = await Axios.get(`http://localhost:5000/post/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log("GET_USER_POST", response.data)
        const userPost = postInitialState.post.push(response.data)
        console.log(userPost)
    } catch (e) {
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
    console.log(useInitialState)
}

const userReducer = (state = useInitialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.REGISTER:
            register(state.username, state.email, state.password, state.confirmPassword)
            if (localStorage.getItem("token")) {
                console.log("PREV_STATE =>", state)
                return {
                    ...state,
                    isLoggedIn: true
                }
            } else {
                return {
                    ...state,
                }
            }
        case ACTION_TYPES.LOGIN:
            login(state.email, state.password)
            if (localStorage.getItem("token")) {
                console.log("PREV_STATE =>", state)
                return {
                    ...state,
                    isLoggedIn: true
                }
            } else {
                return {
                    ...state,
                }
            }
        case ACTION_TYPES.IS_AUTHENTICATED:
            isAuthenticated()
            return {
                ...state,
                isLoggedIn: true
            }
        case ACTION_TYPES.LOGOUT:
            logout()
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return {
                ...state,
            }
    }
}

const postReducer = (state = postInitialState, action) => {
    switch (action.type) {
        case
        ACTION_TYPES.CREATE_POST
        :
            createPost(state.title, state.description)
            return {
                ...state,
                posts: state.posts
            }
        case ACTION_TYPES.GET_POSTS:
            getPosts()
            return {
                ...state,
                posts: state.posts
            }
        case ACTION_TYPES.GET_USER_POST:
            getUserPost()
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}
const reducers = combineReducers({
    useInitialState: userReducer,
    postInitialState: postReducer,
})

export default createStore( reducers, applyMiddleware(thunk) );
