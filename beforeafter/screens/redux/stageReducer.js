import {ADD_STAGE, DELETE_STAGE, GET_STAGES} from './types';

const initialState = {
  stages: [],
};

export const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAGES:
      return {...state, stages: [...state.stages, ...action.payload]};
    case ADD_STAGE:
      return {...state, stages: [...state.stages, action.payload]};
    case DELETE_STAGE: {
      let stages = state.stages.filter(stage => stage.id !== action.payload);
      return {...state, stages: [...stages]};
    }
    default:
      return state;
  }
};
