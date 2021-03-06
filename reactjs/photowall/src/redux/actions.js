import { database } from '../database/config'
// Remove
export function removePost(index) {
    return {
        type: 'REMOVE_POST',
        index: index
    }
}

export function addPost(post) {
    return {
        type: 'ADD_POST',
        post: post
    }
}

export function addComment(comment, postId) {
    return {
        type: 'ADD_COMMENT',
        comment: comment,
        postId: postId
    }
}

export function loadComments(comments) {
    return {
        type: 'LOAD_COMMENTS',
        comments
    }
}

export function loadPosts(posts) {
    return {
        type: 'LOAD_POSTS',
        posts: posts
    }
}
// firebase methods

export function startAddingPost(post) {
    return (dispatch) => {
        return database().ref('posts')
            .update({ [post.id]: post })
            .then(() => {
                dispatch(addPost(post));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function startLoadingPost() {
    return (dispatch) => {
        return database().ref('posts')
            .once('value')
            .then((snapshot) => {
                let posts = []
                snapshot.forEach((child) => {
                    posts.push(child.val());
                })

                dispatch(loadPosts(posts))
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function startRemovingPost(index, id) {
    return (dispatch) => {
        return database().ref(`posts/${id}`)
            .remove()
            .then(() => {
                console.log(index);
                dispatch(removePost(index))
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export function startAddingComments(comment, postId) {
    return (dispatch) => {
        return database().ref(`comments/${postId}`)
            .push(comment)
            .then(() => {
                dispatch(addComment(comment, postId))
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function startLoadingComments() {
    return (dispatch) => {
        return database().ref('comments')
            .once('value')
            .then((snapshot) => {
                let comments = {}
                snapshot.forEach((child) => {
                    comments[child.key] = Object.values(child.val())
                })

                dispatch(loadComments(comments))
            })
    }
}

