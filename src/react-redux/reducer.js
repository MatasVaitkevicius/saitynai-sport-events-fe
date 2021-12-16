import { LOGIN_SUCCESSFUL } from "./actions";

export default function reducer(state, action) {
  if (action.type === LOGIN_SUCCESSFUL) {
    if (action.payload.access_token) {
      localStorage.setItem("access_token", action.payload.access_token);
      return {
        ...state,
        access_token: action.payload.access_token,
        loggedIn: true,
      };
    } else {
      return { ...state };
    }
  }
  return state;
}
