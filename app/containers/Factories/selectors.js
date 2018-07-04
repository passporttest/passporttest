import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the factories state domain
 */

const selectFactoriesDomain = state => state.get('factories', initialState);

/**
 * Other specific selectors
 */

const makeSelectFactoryList = () =>
  createSelector(selectFactoriesDomain, substate =>
    substate.get('factoryList'),
  );

/**
 * Default selector used by Factories
 */

const makeSelectFactories = () =>
  createSelector(selectFactoriesDomain, substate => substate.toJS());

export default makeSelectFactories;
export { selectFactoriesDomain, makeSelectFactoryList };
