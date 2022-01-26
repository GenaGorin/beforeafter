import {testApi} from '../api/api';
import {
  ADD_AMBITIOUS_AUTHORS,
  ADD_GOAL,
  ADD_STAGE,
  AUTH_ME,
  CHANGE_GOAL_STATUS,
  CREATE_POST,
  FETCH_POST,
  GET_COMMENTS,
  GET_GOALS,
  GET_POPULAR_GOALS,
  GET_STAGES,
  GET_SUB_GOALS,
  GET_TAG_GOALS,
  GET_USER,
  HIDE_ALERT,
  HIDE_LOADER,
  LOGOUT,
  SEND_COMMENT,
  SET_COMMENT_LIKE,
  SET_FOLLOWERS,
  SET_GOALS_COUNT,
  SET_LIKE,
  SET_POPULAR_GOALS_COUNT,
  SET_POPULAR_LIKE,
  SET_SUB_GOALS_COUNT,
  SET_SUB_LIKE,
  SET_TAG_GOALS_COUNT,
  SHOW_ALERT,
  SHOW_LOADER,
} from './types';

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post,
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

export function showAlert(text) {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });
    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}

export function fetchPosts() {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.posts();
      dispatch({
        type: FETCH_POST,
        payload: response.data,
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Server error'));
      dispatch(hideLoader());
    }
  };
}

export function login(data) {
  return async dispatch => {
    try {
      //dispatch(showLoader());
      const response = await testApi.login(data);
      dispatch({
        type: AUTH_ME,
        payload: response.data,
      });
      //dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка авторизации'));
      dispatch(hideLoader());
    }
  };
}

export function Logout() {
  return {
    type: LOGOUT,
  };
}

export function signup(data) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.signup(data);
      dispatch({
        type: AUTH_ME,
        payload: response.data,
      });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e);
      if (e.response.data.errors?.email?.[0]) {
        dispatch(showAlert(e.response.data.errors?.email?.[0]));
      } else {
        dispatch(showAlert('Ошибка регистрации'));
      }

      dispatch(hideLoader());
    }
  };
}

export function updateAva(file) {
  return async dispatch => {
    try {
      const response = await testApi.updateAva(file);
      dispatch({
        type: AUTH_ME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function getUserData() {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.getUserData();
      dispatch({
        type: AUTH_ME,
        payload: response.data.user_data,
      });
      dispatch({
        type: SET_FOLLOWERS,
        payload: response.data.follower_data,
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showLoader());
      dispatch(showAlert('Ошибка servera'));
      dispatch({
        type: AUTH_ME,
        payload: {},
      });
      dispatch(hideLoader());
    }
  };
}

export function updateUserData(data) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.updateUserData(data);
      dispatch({
        type: AUTH_ME,
        payload: response.data,
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export function createGoal(data, callback) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.createGoal(data);
      dispatch({
        type: ADD_GOAL,
        payload: response.data,
      });
      dispatch(hideLoader());
      callback(response);
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export function getGoal(goalId) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.getGoal(goalId);
      dispatch({
        type: ADD_GOAL,
        payload: response.data,
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export function createStage(data, goalId, callback) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.createStage(data, goalId);
      dispatch({
        type: ADD_STAGE,
        payload: response.data,
      });
      callback();
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export function getGoals(offset) {
  return async dispatch => {
    try {
      const response = await testApi.getGoals(offset);
      dispatch({
        type: SET_GOALS_COUNT,
        payload: response.data.count,
      });
      dispatch({
        type: GET_GOALS,
        payload: response.data.goals,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function getUserGoals(userId, offset) {
  return async dispatch => {
    try {
      const response = await testApi.getUserGoals(userId, offset);
      dispatch({
        type: GET_GOALS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function getStages(goalId) {
  return async dispatch => {
    try {
      const response = await testApi.getStages(goalId);
      dispatch({
        type: GET_STAGES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function getUser(userId) {
  return async dispatch => {
    try {
      const response = await testApi.getUser(userId);
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function setLike(goalId) {
  return async dispatch => {
    try {
      const response = await testApi.createLike(goalId);
      if (response.data) {
        dispatch({
          type: SET_LIKE,
          payload: goalId,
        });
        dispatch({
          type: SET_POPULAR_LIKE,
          payload: goalId,
        });
        dispatch({
          type: SET_SUB_LIKE,
          payload: goalId,
        });
      }
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function createCommentLike(commentId) {
  return async dispatch => {
    try {
      await testApi.createCommentLike(commentId);
      dispatch({
        type: SET_COMMENT_LIKE,
        payload: commentId,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}
export async function getAnswersCount(commentId, callback) {
  try {
    const response = await testApi.getAnswersCount(commentId);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function getAnswers(commentId, offset, callback, callback2) {
  try {
    const response = await testApi.getAnswers(commentId, offset);
    callback(response.data);
    callback2(true);
  } catch (e) {
    console.log(e);
  }
}

export async function createAnswerLike(answerId, callback) {
  try {
    await testApi.createAnswerLike(answerId);
    callback();
    //callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function createAnswer(data) {
  try {
    const response = await testApi.createAnswer(data);
    //console.log(response);
    //callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export function changeGoalStatus(goalId, status) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      await testApi.changeGoalStatus(goalId, status);
      dispatch({
        type: CHANGE_GOAL_STATUS,
        payload: {
          goalId: goalId,
          status: status,
        },
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export function getComments(goalId, offset, callback, dontDispatch) {
  return async dispatch => {
    try {
      const response = await testApi.getComment(goalId, offset);
      if (!dontDispatch) {
        dispatch({
          type: GET_COMMENTS,
          payload: response.data.comments,
        });
      }
      if (callback) {
        callback(Number(response.data.count));
      }
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function checkSubscribe(userId, callback, callbackTwo) {
  return async dispatch => {
    try {
      const response = await testApi.checkSubscribe(userId);
      callback(response.data);
      callbackTwo(true);
      //console.log(response);
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function subscribe(userId, callback) {
  return async dispatch => {
    try {
      await testApi.subscribe(userId);
      callback(true);
      //console.log(response);
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function unSubscribe(userId, callback) {
  return async dispatch => {
    try {
      await testApi.unSubscribe(userId);
      callback(false);
      //console.log(response);
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function sendComment(data) {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.sendComment(data);
      dispatch({
        type: SEND_COMMENT,
        payload: response.data,
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export async function getSubsInfo(userId, callback) {
  try {
    const response = await testApi.getSubsData(userId);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function getFollowers(userId, offset, callback) {
  try {
    const response = await testApi.getFollowers(userId, offset);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function getMysubs(userId, offset, callback) {
  try {
    const response = await testApi.getMysubs(userId, offset);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function getCommentsCount(goalId, callback) {
  try {
    const response = await testApi.getCommentsCount(goalId);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function getTags(goalId, callback) {
  try {
    const response = await testApi.getTags(goalId);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function getTagsByName(tagIds, callback) {
  try {
    const response = await testApi.getTagsByName(tagIds);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export function getPopularGoals(offset) {
  return async dispatch => {
    try {
      const response = await testApi.getPopularGoals(offset);
      dispatch({
        type: SET_POPULAR_GOALS_COUNT,
        payload: response.data.count,
      });
      dispatch({
        type: GET_POPULAR_GOALS,
        payload: response.data.goals,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function getSubGoals(offset, callback) {
  return async dispatch => {
    try {
      const response = await testApi.getSubGoals(offset);
      dispatch({
        type: SET_SUB_GOALS_COUNT,
        payload: response.data.count,
      });
      dispatch({
        type: GET_SUB_GOALS,
        payload: response.data.goals,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      callback(false);
    }
  };
}

export function getTagGoals(tagId, offset) {
  return async dispatch => {
    try {
      const response = await testApi.getTagGoals(tagId, offset);
      dispatch({
        type: SET_TAG_GOALS_COUNT,
        payload: response.data.count,
      });
      dispatch({
        type: GET_TAG_GOALS,
        payload: response.data.goals,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export function getFinishedGoals(offset) {
  return async dispatch => {
    try {
      const response = await testApi.getFinishedGoals(offset);
      dispatch({
        type: SET_GOALS_COUNT,
        payload: response.data.count,
      });
      dispatch({
        type: GET_GOALS,
        payload: response.data.goals,
      });
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
    }
  };
}

export async function addView(goalId) {
  try {
    await testApi.addView(goalId);
  } catch (e) {
    console.log(e);
  }
}

export function getAmbitiousAuthors() {
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await testApi.getAmbitiousAuthors();
      dispatch({
        type: ADD_AMBITIOUS_AUTHORS,
        payload: response.data,
      });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(showAlert('Ошибка servera'));
      dispatch(hideLoader());
    }
  };
}

export async function getContacts(callback) {
  try {
    const response = await testApi.getContacts();
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}
