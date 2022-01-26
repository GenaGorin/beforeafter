import {
  ADD_GOAL,
  CHANGE_GOAL_STATUS,
  GET_GOALS,
  SET_GOALS_COUNT,
  SET_LIKE,
} from "./types";

const initialState = {
  goals: [],
  goalscount: 0,
};

export const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOALS:
      let result = [];
      action.payload.forEach((goal) => {
        if (!state.goals.find((item) => item.id === goal.id)) {
          result = [...result, goal];
        }
      });
      return { ...state, goals: [...state.goals, ...result] };
    case SET_GOALS_COUNT:
      return { ...state, goalscount: action.payload };
    case SET_LIKE:
      let goals = state.goals.map((goal) => {
        if (goal.id === action.payload) {
          goal.likes = goal.likes + 1;
          return goal;
        } else {
          return goal;
        }
      });

      return { ...state, goals: goals };
    case CHANGE_GOAL_STATUS:
      let goalss = state.goals.map((goal) => {
        if (goal.id === action.payload.goalId) {
          goal.done = action.payload.status;
          return goal;
        } else {
          return goal;
        }
      });

      return { ...state, goals: goalss };
    case ADD_GOAL:
      return { ...state, goals: [...state.goals, action.payload] };

    default:
      return state;
  }
};
