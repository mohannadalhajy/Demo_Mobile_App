import getErrorMessage from "../../errors";
import {
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    FETCH_PROFILE_REQUEST,
    FETCH_EDIT_EMAIL_SUCCESS,
    FETCH_PROFILE_FAILURE,
    FETCH_RESET_PASS_SUCCESS,
    FETCH_INIT_EDIT_PROFILE,
    FETCH_INIT_PROFILE,
} from "./actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
const clientAuth = require('./api');
export const loginRequestAction = () => {
    return {
        type: FETCH_LOGIN_REQUEST,
    };
};
export const loginSuccessAction = (user) => {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: user,
    };
};
export const loginFailureAction = (error) => {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: error,
    };
};
export const login = body => async (dispatch, getState) => {
    dispatch(loginRequestAction());
    const promise = clientAuth.login(body);
    promise.then(async(response)=>{
        const result = response.data.result;
        console.log("driver To Show : \n", result);
        await AsyncStorage.setItem("@accessToken", result.accessToken);//AsyncStorage
        dispatch(loginSuccessAction(result.driver));
    }).catch(async (error) => {
        await AsyncStorage.removeItem("@accessToken");//AsyncStorage
        dispatch({ type: FETCH_INIT_PROFILE, payload: "" })
    });
};
export const register = body => async (dispatch, getState) => {
    dispatch(loginRequestAction());
    const promise = clientAuth.register(body);
    promise.then(response=>{
        const result = response.data.result;
        console.log("driver To Show : \n", result);
        dispatch(loginSuccessAction(result));
    }).catch(async (error) => {
        await AsyncStorage.removeItem("@accessToken");//AsyncStorage
        dispatch({ type: FETCH_INIT_PROFILE, payload: "" })
    });
};
export async function profileMe(dispatch, getState) {
    dispatch(loginRequestAction());
    const promise = clientAuth.getProfile();
    promise.then(async (response) => {
        const result = response.data.result;
        console.log("driver To Show : \n", result);
        await AsyncStorage.setItem("@accessToken", result.accessToken);//AsyncStorage
        dispatch(loginSuccessAction(result.driver));
    }).catch(async (error) => {
        await AsyncStorage.removeItem("@accessToken");//AsyncStorage
        dispatch({ type: FETCH_INIT_PROFILE, payload: "" })
    });
};
export const logout = () => {
    return (dispatch) => {
        dispatch(loginRequestAction());
        const promise = clientAuth.logout();
        promise.then(async (response) => {
            await AsyncStorage.removeItem("@accessToken");//AsyncStorage
            dispatch(profileMe)
            dispatch(loginSuccessAction({}));

        })
        promise.catch((error) => {
            let errorMsg = ""
            if (error.response)
                errorMsg = getErrorMessage(error.response.data.error.code);
            else errorMsg = "Network Failed"
            dispatch(loginFailureAction(errorMsg));
        });
    };
};





export const editEmailRequestAction = () => {
    return {
        type: FETCH_PROFILE_REQUEST,
    };
};
export const editUserSuccessAction = (user) => {
    return {
        type: FETCH_EDIT_EMAIL_SUCCESS,
        payload: user,
    };
};
export const verifyCodeUserFailureAction = (error) => {
    return {
        type: FETCH_PROFILE_FAILURE,
        payload: error,
    };
};
export const editEmail = (body) => {
    return (dispatch) => {
        dispatch(editEmailRequestAction());
        const promise = clientAuth.editEmail(body);
        promise.then((response) => {
            dispatch(editUserSuccessAction(body.newEmail));
        })
        promise.catch((error) => {
            let errorMsg = ""
            if (error.response)
                errorMsg = getErrorMessage(error.response.data.error.message.code);
            else errorMsg = "Network Failed"
            dispatch(verifyCodeUserFailureAction(errorMsg));
        });
    };
};
export const resetPasswordSuccessAction = () => {
    return {
        type: FETCH_RESET_PASS_SUCCESS,
        payload: "",
    };
};
export const resetPass = (body) => {
    return (dispatch) => {
        dispatch(editEmailRequestAction());
        const promise = clientAuth.resetPass(body);
        promise.then((response) => {
            dispatch(resetPasswordSuccessAction());
        })
        promise.catch((error) => {
            let errorMsg = ""
            if (error.response)
                errorMsg = getErrorMessage(error.response.data.error.message.code);
            else errorMsg = "Network Failed"
            dispatch(verifyCodeUserFailureAction(errorMsg));
        });
    };
};
async function initEditProfile(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_PROFILE, payload: "" })
}
async function initProfile(dispatch, getState) {
    dispatch({ type: FETCH_INIT_PROFILE, payload: "" })
}