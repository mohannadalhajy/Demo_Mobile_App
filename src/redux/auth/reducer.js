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
  const initState = {
    isLoggedIn: false,
    loading: true,
    user: {},
    error: "",
    expiresOn: '',
  };
  const UserReducer = (state = initState, action) => {
    switch (action.type) {
      case FETCH_LOGIN_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case FETCH_INIT_PROFILE: {
        return {
          loading: false,
          user: {},
          isLoggedIn: false,
          error: ""
        };
      }
      case FETCH_LOGIN_SUCCESS: {
        return {
          loading: false,
          user: action.payload,
          isLoggedIn: true,
          error: "",
        };
      }
      case FETCH_LOGIN_FAILURE: {
        return {
          ...state,
          error: action.payload,
          isLoggedIn: false,
          loading: false
        };
      }
      case FETCH_PROFILE_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case FETCH_EDIT_EMAIL_SUCCESS: {
        return {
          loading: false,
          user: { ...state.user, email: action.payload },
          isLoggedIn: true,
          error: "edited",
        };
      }
      case FETCH_PROFILE_FAILURE: {
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      }
      case FETCH_RESET_PASS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: "edited",
        };
      }
      case FETCH_INIT_EDIT_PROFILE: {
        return { ...state, error: "" }
      }
      default: {
        return state;
      }
    }
  }
  export default UserReducer;