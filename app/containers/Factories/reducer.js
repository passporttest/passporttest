/*
 *
 * Factories reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  CREATE_FACTORY_SUCCESS,
  DELETE_FACTORY_SUCCESS,
  EDIT_FACTORY_SUCCESS,
  GET_FACTORIES_SUCCESS,
} from './constants';

export const initialState = fromJS({
  factoryList: List([]),
});

function factoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FACTORIES_SUCCESS:
      return state.set('factoryList', fromJS(action.factories));
    case CREATE_FACTORY_SUCCESS:
      return state.set(
        'factoryList',
        state.get('factoryList').push(fromJS(action.factory)),
      );
    case DELETE_FACTORY_SUCCESS:
      return state.set(
        'factoryList',
        state
          .get('factoryList')
          .filter(factory => factory.get('id') !== action.factoryId),
      );
    case EDIT_FACTORY_SUCCESS:
      return state.set(
        'factoryList',
        state
          .get('factoryList')
          .update(
            state
              .get('factoryList')
              .findIndex(item => item.get('id') === action.factory.id),
            () => fromJS(action.factory),
          ),
      );
    default:
      return state;
  }
}

export default factoriesReducer;
