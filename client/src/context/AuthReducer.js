const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };
        case "FOLLOW":
            return {
                ...state,
                //This meas to take the previous state and past here
                user: {
                    ...state.user,
                    //Now this takes all properties of user from INITIAL_STATE
                    followings: [...state.user.followings, action.payload]
                    //This takes all of the users in the followings array(if there
                    //is any) and after will add another user from action.payload
                }
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    )
                }
            };
        case "BOOKMARK":
            return {
                ...state,
                user: {
                    ...state.user,
                    bookmarkedPosts: [...state.user.bookmarkedPosts, action.payload]
                }
            };
        case "UNBOOKMARK":
            return {
                ...state,
                user: {
                    ...state.user,
                    bookmarkedPosts: state.user.bookmarkedPosts.filter(
                        (post) => post !== action.payload
                    )
                }
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
};

export default AuthReducer;