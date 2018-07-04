/*
 *
 * Factories actions
 *
 */

import {
  GET_FACTORIES,
  GET_FACTORIES_ERROR,
  GET_FACTORIES_SUCCESS,
  CREATE_FACTORY,
  CREATE_FACTORY_ERROR,
  CREATE_FACTORY_SUCCESS,
  DELETE_FACTORY,
  DELETE_FACTORY_ERROR,
  DELETE_FACTORY_SUCCESS,
  EDIT_FACTORY,
  EDIT_FACTORY_ERROR,
  EDIT_FACTORY_SUCCESS,
  GENERATE_NUMBERS,
  GENERATE_NUMBERS_ERROR,
  GENERATE_NUMBERS_SUCCESS,
} from './constants';

export function getFactories() {
  return {
    type: GET_FACTORIES,
  };
}

export function getFactoriesError() {
  return {
    type: GET_FACTORIES_ERROR,
  };
}

export function getFactoriesSuccess(factories) {
  return {
    type: GET_FACTORIES_SUCCESS,
    factories,
  };
}

export function createFactory(factory) {
  return {
    type: CREATE_FACTORY,
    factory,
  };
}

export function createFactoryError(err) {
  return {
    type: CREATE_FACTORY_ERROR,
    err,
  };
}

export function createFactorySuccess(factory) {
  return {
    type: CREATE_FACTORY_SUCCESS,
    factory,
  };
}

export function deleteFactory(factoryId) {
  return {
    type: DELETE_FACTORY,
    factoryId,
  };
}

export function deleteFactoryError(err) {
  return {
    type: DELETE_FACTORY_ERROR,
    err,
  };
}

export function deleteFactorySuccess(factoryId) {
  return {
    type: DELETE_FACTORY_SUCCESS,
    factoryId,
  };
}

export function editFactory(factory) {
  return {
    type: EDIT_FACTORY,
    factory,
  };
}

export function editFactoryError(err) {
  return {
    type: EDIT_FACTORY_ERROR,
    err,
  };
}

export function editFactorySuccess(factory) {
  return {
    type: EDIT_FACTORY_SUCCESS,
    factory,
  };
}

export function generateNumbers(factoryId) {
  return {
    type: GENERATE_NUMBERS,
    factoryId,
  };
}

export function generateNumbersError(err) {
  return {
    type: GENERATE_NUMBERS_ERROR,
    err,
  };
}

export function generateNumbersSuccess(factory) {
  return {
    type: GENERATE_NUMBERS_SUCCESS,
    factory,
  };
}
