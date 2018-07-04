const Factory = require('../models/Factory');

const ACTION_ERROR = 'ACTION_ERROR';
const ADD_FACTORY = 'ADD_FACTORY';
const ADD_FACTORY_ERROR = 'ADD_FACTORY_ERROR';
const DELETE_FACTORY = 'DELETE_FACTORY';
const DELETE_FACTORY_ERROR = 'DELETE_FACTORY_ERROR';
const LIST_FACTORY = 'LIST_FACTORY';
const LIST_FACTORY_ERROR = 'LIST_FACTORY_ERROR';
const UPDATE_FACTORY = 'UPDATE_FACTORY';
const UPDATE_FACTORY_ERROR = 'UPDATE_FACTORY_ERROR';
// const GENERATE_NUMBERS = 'GENERATE_NUMBERS';
const GENERATE_NUMBERS_ERROR = 'GENERATE_NUMBERS_ERROR';

// prettier-ignore
function noop() {
}

function heartbeat() {
  this.isAlive = true;
}

module.exports = wss => {
  setInterval(() => {
    // eslint-disable-next-line consistent-return
    wss.clients.forEach(ws => {
      if (ws.isAlive === false) return ws.terminate();
      // eslint-disable-next-line no-param-reassign
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);

  const getFactories = ws => {
    Factory.find({}, (err, factories) => {
      if (!err) {
        ws.send(
          JSON.stringify({
            channel: LIST_FACTORY,
            payload: factories,
          }),
        );
      } else {
        ws.send(
          JSON.stringify({
            channel: LIST_FACTORY_ERROR,
            payload: err.message,
          }),
        );
      }
    });
  };

  const createFactory = (ws, params) => {
    const factory = new Factory({
      name: params.factory.name,
      min: parseInt(params.factory.min, 10),
      max: parseInt(params.factory.max, 10),
      qty: parseInt(params.factory.qty, 10),
    });

    factory.save(error => {
      if (error) {
        ws.send(
          JSON.stringify({
            channel: ADD_FACTORY_ERROR,
            payload: error.message,
          }),
        );
      } else {
        wss.broadcast(
          JSON.stringify({
            channel: ADD_FACTORY,
            payload: factory,
          }),
        );
      }
    });
  };

  const deleteFactory = (ws, params) => {
    Factory.deleteOne({ _id: params.factoryId }, err => {
      if (err) {
        ws.send(
          JSON.stringify({
            channel: DELETE_FACTORY_ERROR,
            payload: err.message,
          }),
        );
      } else {
        wss.broadcast(
          JSON.stringify({
            channel: DELETE_FACTORY,
            payload: params.factoryId,
          }),
        );
      }
      // deleted at most one tank document
    });
  };

  const editFactory = (ws, params) => {
    try {
      const { factory, newValues } = params.factory;
      if (newValues) {
        const conditions = { _id: factory.id };
        const update = {
          $set: {
            name: newValues.name,
            min: parseInt(newValues.min, 10),
            max: parseInt(newValues.max, 10),
            qty: parseInt(newValues.qty, 10),
          },
        };
        const options = { multi: true };

        Factory.update(conditions, update, options, err => {
          if (err) {
            ws.send(
              JSON.stringify({
                channel: UPDATE_FACTORY_ERROR,
                payload: err.message,
              }),
            );
          } else {
            wss.broadcast(
              JSON.stringify({
                channel: UPDATE_FACTORY,
                payload: {
                  ...factory,
                  name: newValues.name,
                  min: newValues.min,
                  max: newValues.max,
                  qty: newValues.qty,
                },
              }),
            );
          }
        });
      }
    } catch (err) {
      ws.send(
        JSON.stringify({
          channel: UPDATE_FACTORY_ERROR,
          payload: err.message,
        }),
      );
    }
  };

  const generateNumbers = (ws, params) => {
    Factory.findById(params.factoryId, (err, factory) => {
      if (err) {
        ws.send(
          JSON.stringify({
            channel: GENERATE_NUMBERS_ERROR,
            payload: err.message,
          }),
        );
      } else {
        factory.generateNumbers(updatedFactory => {
          wss.broadcast(
            JSON.stringify({
              channel: UPDATE_FACTORY,
              payload: updatedFactory,
            }),
          );
        });
      }
    });
  };

  const allowedMethods = {
    get: getFactories,
    post: createFactory,
    delete: deleteFactory,
    patch: editFactory,
    generate: generateNumbers,
  };

  wss.on('connection', ws => {


    //eslint-disable-next-line no-param-reassign
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    ws.on('message', message => {
      try {
        const parsedMessage = JSON.parse(message);

        const { action, payload } = parsedMessage;
        try {
          allowedMethods[action](ws, payload);
        } catch (e) {
          ws.send(JSON.stringify({ err: `${action} is not a function` }));
        }
      } catch (err) {
        ws.send(
          JSON.stringify({
            channel: ACTION_ERROR,
            payload: err.message,
          }),
        );
      }
    });
  });
};
