import React, {useEffect, useState} from 'react';
import UserPage from "../components/UserPage";
import jwtDecode from "jwt-decode";
import {
    Avatar,
    Fab,
    Modal,
    Backdrop,
    Fade,
    TextField,
    Button,
    IconButton, Paper,
} from "@material-ui/core";
import {
    Add,
    Chat,
    Favorite,
    BookmarkBorder
} from "@material-ui/icons";
import {connect} from "react-redux";
import {ACTION_TYPES} from "../actions/actionTypes";
import Loader from "../components/Loader";

const MyPage = (props) => {
    const [open, setOpen] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [like, setLike] = useState(false)
    const value = props.state
    const posts = props.state.posts
    console.log("PROPS", props)
    console.log("POSTS_FROM_PROPS =>", posts)

    const decode = jwtDecode(token)
    console.log(decode)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPost = (item) => {
        console.log(item.id)
        return item.id
    }

    const handleCreatePost = () => {
        setOpen(false);
        props.createPost()
    }

    const likePost = () => {
        setLike(true)
        console.log("LIKE")
    }

    useEffect(async () => {
        await props.getPosts()
    }, [])

    return (
        <UserPage>
            <div className="userInfo">
                <Avatar className="avatar" style={{backgroundColor: "red"}}>
                    {decode.username[0]}
                </Avatar>
                <div className="userName">
                    <h1>{decode.username}</h1>
                    <p>{decode.email}</p>
                    <span>Status:</span>
                </div>
            </div>
            <div className="posts">
                <h1>Posts:</h1>
                <div className="addPost">
                    <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <Add/>
                    </Fab>
                </div>
                {/*<Loader/>*/}
                {
                    posts.map(item => {
                        return (
                            <div className="post" id={item.id} >
                                <div className="postInfo" onClick={() => handleOpenPost(item)}>
                                    <h1>{item.title}</h1>
                                    <p>{item.description}</p>
                                    <p>Create by: {value.userId}</p>
                                </div>
                                <footer className="postFooter">
                                    <IconButton onClick={likePost}>
                                        <Favorite/>
                                    </IconButton>
                                    <IconButton>
                                        <Chat/>
                                    </IconButton>
                                    <IconButton>
                                        <BookmarkBorder/>
                                    </IconButton>
                                </footer>
                            </div>
                        )
                    })
                }
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="paper">
                        <h2 id="transition-modal-title">Add new post</h2>
                        <TextField
                            label={"Title"}
                            className={"input"}
                            onChange={e => value.title = e.target.value}
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Description"
                            multiline
                            className={"input"}
                            onChange={e => value.description = e.target.value}
                        />
                        <Button
                            onClick={handleCreatePost}
                            variant="contained"
                            color="primary"
                            className={"button"}
                        >
                            Create post
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </UserPage>
    );
};

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: () => {
            dispatch({
                type: ACTION_TYPES.CREATE_POST,
            })
        },
        getPosts: () => {
            dispatch({
                type: ACTION_TYPES.GET_POSTS,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);