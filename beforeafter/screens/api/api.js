import * as axios from 'axios';

const samuraiApi = axios.create({
  // withCredentials: true,
  //baseURL: 'http://x98736zu.beget.tech/web/api/',
  //baseURL: 'http://api/api',
  baseURL: 'https://bfrandftr.ru/web/api/',
});

export const setToken = token => {
  if (token !== null) {
    samuraiApi.defaults.headers.common.Authorization = 'Bearer ' + token;
    return token;
  }
};

export const testApi = {
  login(loginData) {
    return samuraiApi.post('/user/login', loginData);
  },
  signup(loginData) {
    return samuraiApi.post('/user/signup', loginData);
  },
  updateAva(file) {
    let workedObg = {
      uri: file.uri,
      name: file.fileName,
      //filename: 'imageTest.jpg',
      type: file.type,
    };
    let formData = new FormData();
    formData.append('image', workedObg);

    return samuraiApi.post('/user/updateava', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getUserData() {
    return samuraiApi.get('/user/data');
  },
  updateUserData(data) {
    return samuraiApi.post('/user/updateuserdata', data);
  },
  createGoal(data) {
    return samuraiApi.post('/goals/creategoal', data);
  },
  createStage(data, goalId) {
    //console.log("stages", stages);
    let formData = new FormData();
    formData.append('goal_id', goalId);
    formData.append('image', data.file);
    formData.append('description', data.description);
    formData.append('date', data.date);
    return samuraiApi.post('/stages/createstage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getGoals(offset) {
    return samuraiApi.get('/goals/getgoals?offset=' + offset);
  },
  getFinishedGoals(offset) {
    return samuraiApi.get('/goals/getfinishedgoals?offset=' + offset);
  },
  getUserGoals(userId, offset) {
    let data = {
      user_id: userId,
      offset: offset,
    };
    return samuraiApi.post('/goals/getusergoals', data);
  },
  getStages(goalId) {
    let data = {
      goal_id: goalId,
    };
    return samuraiApi.post('/stages/getstages', data);
  },
  getUser(userId) {
    return samuraiApi.get('/user/getuser?user_id=' + userId);
  },
  createLike(goalId) {
    let data = {
      goal_id: goalId,
    };
    return samuraiApi.post('/goals/createlike', data);
  },
  createCommentLike(commentId) {
    let data = {
      comment_id: commentId,
    };
    return samuraiApi.post('/comments/createlike', data);
  },
  createAnswer(data) {
    return samuraiApi.post('/answer/createanswer', data);
  },
  getAnswersCount(commentId) {
    let data = {
      comment_id: commentId,
    };
    return samuraiApi.post('/answer/getanswerscount', data);
  },
  getAnswers(commentId, offset) {
    let data = {
      comment_id: commentId,
      offset: offset,
    };
    return samuraiApi.post('/answer/getanswers', data);
  },
  createAnswerLike(answerId) {
    let data = {
      answer_id: answerId,
    };
    return samuraiApi.post('/answer/createlike', data);
  },
  getComment(goalId, offset) {
    return samuraiApi.get(
      '/comments/getcomments?goal_id=' + goalId + '&offset=' + offset,
    );
  },
  getGoal(goalId) {
    return samuraiApi.get('/goals/getgoal?goal_id=' + goalId);
  },
  checkSubscribe(userId) {
    let data = {
      user_id: userId,
    };
    return samuraiApi.post('/subscriptions/checksubscribe', data);
  },
  subscribe(userId) {
    let data = {
      user_id: userId,
    };
    return samuraiApi.post('/subscriptions/subscribe', data);
  },
  unSubscribe(userId) {
    let data = {
      user_id: userId,
    };
    return samuraiApi.post('/subscriptions/unsubscribe', data);
  },
  sendComment(data) {
    return samuraiApi.post('/comments/sendcomment', data);
  },
  getSubsData(userId) {
    return samuraiApi.get('/user/getsubscribeinfo?user_id=' + userId);
  },
  getFollowers(userId, offset) {
    let data = {
      user_id: userId,
      offset: offset,
    };
    return samuraiApi.post('/subscriptions/getfollowers', data);
  },
  getMysubs(userId, offset) {
    let data = {
      user_id: userId,
      offset: offset,
    };
    return samuraiApi.post('/subscriptions/getmysubs', data);
  },
  getCommentsCount(goalId) {
    let data = {
      goal_id: goalId,
    };
    return samuraiApi.post('/comments/getcommentscount', data);
  },
  getTags(goalId) {
    let data = {
      goal_id: goalId,
    };
    return samuraiApi.post('/tags/gettags', data);
  },
  getTagsByName(tagIds) {
    let data = {
      tag_ids: tagIds,
    };
    return samuraiApi.post('/tags/gettagsbyname', data);
  },
  getPopularGoals(offset) {
    return samuraiApi.get('/goals/getpopulargoals?offset=' + offset);
  },
  getSubGoals(offset) {
    return samuraiApi.get('/goals/getsubgoals?offset=' + offset);
  },
  getTagGoals(tagId, offset) {
    let data = {
      tag_id: tagId,
      offset: offset,
    };
    return samuraiApi.post('/goals/gettaggoals', data);
  },
  addView(goalId) {
    let data = {
      goal_id: goalId,
    };
    return samuraiApi.post('/goals/addview', data);
  },
  changeGoalStatus(goalId, status) {
    let data = {
      goal_id: goalId,
      status: status,
    };
    return samuraiApi.post('/goals/changegoalstatus', data);
  },
  getAmbitiousAuthors() {
    return samuraiApi.get('/goals/getambitiousauthors');
  },
  getContacts() {
    return samuraiApi.get('/contacts/getcontacts');
  },
  searchGoals(search) {
    let data = {
      search: search,
    };
    return samuraiApi.post('/goals/search', data);
  },
  searchTags(search) {
    let data = {
      search: search,
    };
    return samuraiApi.post('/tags/search', data);
  },
  deleteStage(goalId, stageId) {
    let data = {
      goal_id: goalId,
      stage_id: stageId,
    };
    return samuraiApi.post('/stages/deletestage', data);
  },
  deleteGoal(goalId) {
    let data = {
      goal_id: goalId,
    };
    return samuraiApi.post('/goals/deletegoal', data);
  },
  clickOnContact(contact) {
    let data = {
      contact: contact,
    };
    return samuraiApi.post('/contacts/upclick', data);
  },
  checkVersion() {
    return samuraiApi.get('/user/checkversion');
  },
};
