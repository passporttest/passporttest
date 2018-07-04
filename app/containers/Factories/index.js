/**
 *
 * Factories
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFactories, { makeSelectFactoryList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  createFactory,
  deleteFactory,
  editFactory,
  generateNumbers,
  getFactories,
} from './actions';
import Factory from '../../components/Factory/Loadable';
import AddFactory from '../../components/AddFactory/Loadable';

/* eslint-disable react/prefer-stateless-function */
export class Factories extends React.PureComponent {
  componentWillMount() {
    const { triggerGetFactories } = this.props;
    triggerGetFactories();
  }

  render() {
    const {
      factoryList,
      triggerCreateFactory,
      triggerDeleteFactory,
      triggerEditFactory,
      triggerGenerateNumbers,
    } = this.props;
    return (
      <div
        style={{
          overflow: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <Helmet>
          <title>Factories</title>
          <meta name="description" content="Description of Factories" />
        </Helmet>
        {factoryList.map(factory => (
          <Factory
            key={factory.get('id')}
            factory={factory.toJS()}
            onDelete={triggerDeleteFactory}
            onEdit={triggerEditFactory}
            onTriggerGenerate={triggerGenerateNumbers}
          />
        ))}
        <AddFactory onSubmit={triggerCreateFactory} />
      </div>
    );
  }
}

Factories.propTypes = {
  factoryList: PropTypes.object.isRequired,
  triggerGetFactories: PropTypes.func.isRequired,
  triggerCreateFactory: PropTypes.func.isRequired,
  triggerDeleteFactory: PropTypes.func.isRequired,
  triggerEditFactory: PropTypes.func.isRequired,
  triggerGenerateNumbers: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  factories: makeSelectFactories(),
  factoryList: makeSelectFactoryList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    triggerGetFactories: () => dispatch(getFactories()),
    triggerCreateFactory: factory => dispatch(createFactory(factory)),
    triggerDeleteFactory: factoryId => dispatch(deleteFactory(factoryId)),
    triggerEditFactory: factory => dispatch(editFactory(factory)),
    triggerGenerateNumbers: factoryId => dispatch(generateNumbers(factoryId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'factories', reducer });
const withSaga = injectSaga({ key: 'factories', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Factories);
