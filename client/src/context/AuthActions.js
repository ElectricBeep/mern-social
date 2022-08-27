export const LoginStart = (userCreds) => ({
    type: "LOGIN_START"
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const Logout = () => ({
    type: "LOGOUT"
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId
});

export const Bookmark = (postId) => ({
    type: "BOOKMARK",
    payload: postId
});

export const UnBookmark = (postId) => ({
    type: "UNBOOKMARK",
    payload: postId
});

export const UpdateStart = () => ({
    type: "UPDATE_START"
});

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user
});

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE"
});