import { LOGIN_SUCCESSFUL } from "./actions";

export default function reducer(state, action) {
  if (action.type === LOGIN_SUCCESSFUL) {
    console.log(action.payload.access_token);
    if (action.payload.access_token) {
      localStorage.setItem("access_token", action.payload.access_token);
      return {
        ...state,
        access_token: action.payload.access_token,
        loggedIn: true,
      };
    } else {
      console.log("access_token undefined or false");
      return { ...state };
    }
  }
  return state;
}
