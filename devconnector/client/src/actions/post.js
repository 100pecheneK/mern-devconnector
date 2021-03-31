import axios from 'axios'
import {setAlert} from "./alert"
import {
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    POSTS_LOADING, REMOVE_COMMENT,
    UPDATE_LIKES
} from "./types"
import {makeConfig} from "./axios.config"

// Get posts
export const getPosts = () => async dispatch => {
    dispatch({type: POSTS_LOADING})
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Get post
export const getPost = id => async dispatch => {
    dispatch({type: POSTS_LOADING})
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        })
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Пост удалён', 'success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Add post
export const addPost = formData => async dispatch => {
    const config = makeConfig()
    try {
        const res = await axios.post('/api/posts/', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Пост создан', 'success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = makeConfig()
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Комментарий создан', 'success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Комментарий удалён', 'success'))
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}