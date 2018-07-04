/**
 *
 * AddFactory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class AddFactory extends React.Component {
  handleReset = () => {
    this.setState({
      name: '',
      min: 1,
      max: 100,
      qty: 15,
    });
  };
  handleChange = e => {
    const currentState = this.state;
    let { value } = e.target;
    const { name } = e.target;
    if (name.toLowerCase() === 'qty' && value > 15) {
      value = 15;
    } else if (name.toLowerCase() === 'qty' && value < 1) {
      value = 1;
    }
    currentState[name] = value;
    this.setState(currentState);
  };
  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.handleReset();
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      min: 1,
      max: 100,
      qty: 15,
    };
  }
  render() {
    const { name, qty, min, max } = this.state;
    const submitDisabled =
      !name || !qty || qty < 1 || !min || !max || min > max;

    return (
      <Card
        style={{
          verticalAlign: 'top',
          display: 'inline-block',
          marginTop: '5px',
          marginLeft: '5px',
          marginRight: '15px',
        }}
      >
        <Card.Content>
          <Card.Header>Add a Factory</Card.Header>
          <Card.Description>
            <Form>
              <Form.Input
                type="text"
                required
                name="name"
                onChange={this.handleChange}
                placeholder="Factory Name"
                fluid
                value={name}
              />
              <Form.Group widths="equal">
                <Form.Input
                  type="number"
                  required
                  name="qty"
                  onChange={this.handleChange}
                  placeholder="QTY"
                  fluid
                  value={qty}
                />
                <Form.Input
                  type="number"
                  required
                  name="min"
                  onChange={this.handleChange}
                  fluid
                  placeholder="Min."
                  value={min}
                />
                <Form.Input
                  type="number"
                  required
                  name="max"
                  onChange={this.handleChange}
                  fluid
                  placeholder="Max."
                  value={max}
                />
              </Form.Group>
            </Form>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              onClick={this.handleSubmit}
              basic
              color="green"
              disabled={submitDisabled}
            >
              Save
            </Button>
            <Button onClick={this.handleReset} basic color="red">
              Cancel
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

AddFactory.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddFactory;
