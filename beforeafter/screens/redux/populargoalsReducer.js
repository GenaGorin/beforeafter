import {
  GET_POPULAR_GOALS,
  SET_POPULAR_GOALS_COUNT,
  SET_POPULAR_LIKE,
} from "./types";

const initialState = {
  goals: [],
  goalscount: 0,
};

export const populargoalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_GOALS:
      let result = [];
      action.payload.forEach((goal) => {
        if (!state.goals.find((item) => item.id === goal.id)) {
          result = [...result, goal];
        }
      });
      return { ...state, goals: [...state.goals, ...result] };
    case SET_POPULAR_GOALS_COUNT:
      return { ...state, goalscount: action.payload };
    case SET_POPULAR_LIKE:
      let goals = state.goals.map((goal) => {
        if (goal.id === action.payload) {
          goal.likes = goal.likes + 1;
          return goal;
        } else {
          return goal;
        }
      });

      return { ...state, goals: goals };

    default:
      return state;
  }
};
