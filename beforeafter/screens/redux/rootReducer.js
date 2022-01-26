import {combineReducers} from 'redux';
import {appReducer} from './appReducer';
import {goalsReducer} from './goalsReducer';
import {postsReducer} from './postsReducer';
import {userReducer} from './userReducer';
import {persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import {stageReducer} from './stageReducer';
import {usersReducer} from './usersReducer';
import {commentsReducer} from './commentReducer';
import {populargoalsReducer} from './populargoalsReducer';
import {subgoalsReducer} from './subgoalsReducer';
import {taggoalReducer} from './taggoalReducer';
import {ambitiousauthorsReducer} from './ambitiousauthorsReducer';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  posts: postsReducer,
  app: appReducer,
  goals: goalsReducer,
  popularGoals: populargoalsReducer,
  subGoals: subgoalsReducer,
  tagGoals: taggoalReducer,
  user: userReducer,
  stages: stageReducer,
  users: usersReducer,
  comments: commentsReducer,
  ambitious: ambitiousauthorsReducer,
});

export default persistReducer(persistConfig, rootReducer);
