import {AUTH_ME, LOGOUT, SET_FOLLOWERS} from './types';

const initialState = {
  user: {},
  followMe: 0,
  iFollow: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ME:
      return {...state, user: action.payload};
    case LOGOUT:
      return {user: {}, followMe: 0, iFollow: 0};
    case SET_FOLLOWERS:
      return {
        ...state,
        followMe: action.payload.follow_me,
        iFollow: action.payload.i_follow,
      };
    default:
      return state;
  }
};
