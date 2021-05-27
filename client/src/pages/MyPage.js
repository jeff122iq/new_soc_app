import React, {useEffect, useState} from 'react';
import UserPage from "../components/UserPage";
import jwtDecode from "jwt-decode";
import {
    Avatar,
    Fab,
    Modal,
    Backdrop,
    Fade, TextField, Button
} from "@material-ui/core";
import {
    Add
} from "@material-ui/icons";
import {connect} from "react-redux";
import {ACTION_TYPES} from "../actions/actionTypes";

const MyPage = ( props ) => {
    const [open, setOpen] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const value = props.state

    const decode = jwtDecode(token)
    console.log(decode)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreatePost = () => {
        setOpen(false);
        props.createPost()
    }

    useEffect(() => {
        props.getPosts()
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
                    {/*<p>{status.data}</p>*/}
                </div>
            </div>
            <div className="posts">
                <h1>Posts:</h1>
                <div className="addPost">
                    <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <Add/>
                    </Fab>
                </div>
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
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: () => {
            dispatch ({
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