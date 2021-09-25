import {createReducer} from "../config/create-reducer";
import {REHYDRATE} from "redux-persist";
import {setAuthToken} from "./authDispatcher";

export const LOGIN = "auth/login";
export const LOGOUT = "auth/logout"

export const initialState = {
    isLoggedIn: false,
    token: null,
    user: null
}

const loginUser = (state,action)=>{
    let updatedState = {}
    if(action?.payload?.user){
        // console.log(action);
        updatedState={isLoggedIn: true, token: action.payload.token, user: action.payload.user}
    }
    return { ...state, ...updatedState}
}

const logOutUser = (state, action) => {
    return { ...state, isLoggedIn: false, token: null, user: null}
}

const rehydrateApp = (state, action) => {
    if(action?.payload?.auth?.user) {
        let {auth} = action.payload;
        let {user, token} = auth;
        setAuthToken(token)

        return { ...state, isLoggedIn: true, token: token, user: user}
    } else {
        return { ...state}
    }
};

const authReducer = createReducer(initialState, {
    [LOGIN]: loginUser,
    [REHYDRATE]: rehydrateApp,
    [LOGOUT]: logOutUser
});

export default authReducer;