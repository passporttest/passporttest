/**
 *
 * App.js
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import Factories from '../../containers/Factories/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';

const style = {
  h1: {
    marginTop: '1em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
};

export default function App() {
  return (
    <Container>
      <Header as="h1" dividing style={style.h1}>
        Random Number Generator
      </Header>
      <Switch>
        <Route exact path="/" component={Factories} />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  );
}
