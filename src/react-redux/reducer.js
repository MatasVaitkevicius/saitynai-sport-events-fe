import { POST_DATA } from "./actions";

export default function reducer(state, action) {
  if (action.type === POST_DATA) {
    fetch(action.payload.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password,
      }),
    }).then((element) => {
      console.log(element);
    });

    return { ...state };
  }
  return state;
}
