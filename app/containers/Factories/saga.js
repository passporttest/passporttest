import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import {
  createFactorySuccess,
  deleteFactorySuccess,
  editFactorySuccess,
  getFactoriesSuccess,
} from './actions';
import {
  CREATE_FACTORY,
  DELETE_FACTORY,
  EDIT_FACTORY,
  GENERATE_NUMBERS,
  GET_FACTORIES,
} from './constants';

const ADD_FACTORY = 'ADD_FACTORY';
const REMOVE_FACTORY = 'DELETE_FACTORY';
const LIST_FACTORY = 'LIST_FACTORY';
const UPDATE_FACTORY = 'UPDATE_FACTORY';

function connect() {
  // eslint-disable-next-line no-restricted-globals
  const HOST = location.origin.replace(/^http/, 'ws');
  const socket = new WebSocket(`${HOST}/api`);
  return new Promise(resolve => {
    socket.onopen = () => {
      resolve(socket);
    };
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    // eslint-disable-next-line
    socket.onmessage = e => {
      let msg = null;
      try {
        msg = JSON.parse(e.data);
      } catch (err) {
        // console.error(`Error parsing : ${e.data}`);
      }
      if (msg) {
        const { payload, channel } = msg;
        switch (channel) {
          case LIST_FACTORY:
            return emit(getFactoriesSuccess(payload));
          case REMOVE_FACTORY:
            return emit(deleteFactorySuccess(payload));
          case ADD_FACTORY:
            return emit(createFactorySuccess(payload));
          case UPDATE_FACTORY:
            return emit(editFactorySuccess(payload));
          default:
          // nothing to do
        }
      }
    };
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const payload = yield take(CREATE_FACTORY);
    socket.send(
      JSON.stringify({
        action: 'post',
        payload,
      }),
    );
  }
}

function* remove(socket) {
  while (true) {
    const payload = yield take(DELETE_FACTORY);
    socket.send(
      JSON.stringify({
        action: 'delete',
        payload,
      }),
    );
  }
}

function* edit(socket) {
  while (true) {
    const payload = yield take(EDIT_FACTORY);
    socket.send(
      JSON.stringify({
        action: 'patch',
        payload,
      }),
    );
  }
}

function* generateNumbers(socket) {
  while (true) {
    const payload = yield take(GENERATE_NUMBERS);
    socket.send(
      JSON.stringify({
        action: 'generate',
        payload,
      }),
    );
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(remove, socket);
  yield fork(edit, socket);
  yield fork(generateNumbers, socket);
}

function* flow() {
  while (true) {
    yield take(GET_FACTORIES);
    const socket = yield call(connect);
    socket.send(
      JSON.stringify({
        action: 'get',
      }),
    );
    // yield put(getFactories());
    yield fork(handleIO, socket);

    // let action = yield take(`${logout}`);
    // yield cancel(task);
    // socket.emit('logout');
  }
}

export default function* rootSaga() {
  yield fork(flow);
}
