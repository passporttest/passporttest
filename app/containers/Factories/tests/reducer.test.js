import { fromJS } from 'immutable';
import factoriesReducer from '../reducer';

describe('factoriesReducer', () => {
  it('returns the initial state', () => {
    expect(factoriesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
