import {ADD_AMBITIOUS_AUTHORS} from './types';

const initialState = {
  user_ids: [],
};

export const ambitiousauthorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AMBITIOUS_AUTHORS:
      let uniqueIds = [];
      action.payload.forEach(item => {
        if (!uniqueIds.includes(item.user_id)) {
          uniqueIds = [...uniqueIds, item.user_id];
        }
      });
      return {...state, user_ids: [...state.user_ids, ...uniqueIds]};

    default:
      return state;
  }
};
