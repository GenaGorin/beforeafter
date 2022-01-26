import { GET_USER } from "./types";

const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      if (!state.users.find((item) => item.id === action.payload.id)) {
        return { ...state, users: [...state.users, action.payload] };
      }
      return state;
    default:
      return state;
  }
};
