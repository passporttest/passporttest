/**
 *
 * Factory
 *
 */

import React from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Segment,
  Table,
  Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class Factory extends React.Component {
  handleDelete = () => {
    const { onDelete, factory } = this.props;
    onDelete(factory.id);
  };
  toggleEdit = inputName => {
    const {
      factory: { name, min, max },
    } = this.props;
    this.setState(
      {
        editing: inputName,
      },
      () => {
        if (this.state.editing === 'name') {
          this.nameInput.focus();
          this.setState({
            name,
            min,
            max,
          });
        }
      },
    );
  };
  handleChange = e => {
    const { state } = this;

    let newValue = e.target.value;
    const newName = e.target.name;

    if (newName.toLowerCase() === 'qty' && newValue > 15) {
      newValue = 15;
    } else if (newName.toLowerCase() === 'qty' && newValue < 1) {
      newValue = 1;
    }
    state[newName] = newValue;
    this.setState(state, () => {
      const { name, min, max, qty } = this.state;
      const confirmDisabled =
        min > max || !min || !max || !name || !qty || qty < 1;
      this.setState({
        confirmDisabled,
      });
    });
  };
  handleEdit = () => {
    const {
      props: { onEdit, factory },
      state,
    } = this;

    this.toggleEdit(false);

    delete state.editing;
    const params = {
      factory,
      newValues: state,
    };
    onEdit(params);
  };
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: props.factory.name,
      min: props.factory.min,
      max: props.factory.max,
      qty: props.factory.qty,
      confirmDisabled: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      factory: { name, min, max, qty },
    } = nextProps;
    if (name !== this.state.name) {
      this.setState({
        name,
      });
    } else if (parseInt(min, 10) !== this.state.min) {
      this.setState({
        min,
      });
    } else if (parseInt(max, 10) !== this.state.max) {
      this.setState({
        max,
      });
    } else if (parseInt(qty, 10) !== this.state.qty) {
      this.setState({
        qty,
      });
    }
  }
  render() {
    const {
      factory: { numbers, id },
      onTriggerGenerate,
    } = this.props;

    const { editing, name, min, max, qty, confirmDisabled } = this.state;

    const textValues = {
      name: (
        <Segment basic onClick={() => this.toggleEdit('name')}>
          {name}
        </Segment>
      ),
      minMax: (
        <div>
          <Segment.Group onClick={() => this.toggleEdit('minMax')}>
            <Segment>
              <strong>Qty:</strong> {qty}
            </Segment>
            <Segment>
              <strong>Min:</strong> {min}
            </Segment>
            <Segment>
              <strong>Max: </strong> {max}
            </Segment>
          </Segment.Group>
        </div>
      ),
    };

    const nameInput = (
      <Segment basic>
        <Input
          size="large"
          type="text"
          required
          name="name"
          onChange={this.handleChange}
          placeholder="Factory Name"
          fluid
          transparent
          onBlur={this.handleEdit}
          value={name}
          ref={input => {
            this.nameInput = input;
          }}
        />
      </Segment>
    );
    const minMaxInput = (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              type="number"
              required
              name="qty"
              onChange={this.handleChange}
              value={qty}
              fluid
              placeholder="Qty"
              label="Qty"
            />
            <Form.Input
              type="number"
              required
              name="min"
              onChange={this.handleChange}
              value={min}
              fluid
              placeholder="Min"
              label="Min"
            />
            <Form.Input
              type="number"
              required
              name="max"
              onChange={this.handleChange}
              value={max}
              fluid
              placeholder="Max"
              label="Max"
            />
          </Form.Group>
        </Form>
        <Button fluid onClick={this.handleEdit} disabled={confirmDisabled}>
          Confirm
        </Button>
      </div>
    );

    const numberList = [];
    for (let x = 0, n = numbers.length; x < n; x += 1) {
      numberList.push(
        <Table.Row key={x}>
          <Table.Cell>{numbers[x]}</Table.Cell>
        </Table.Row>,
      );
    }

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
          <Card.Header>
            {editing === 'name' ? nameInput : textValues.name}
          </Card.Header>
          <Card.Meta>
            {editing === 'minMax' ? minMaxInput : textValues.minMax}
          </Card.Meta>
          <Segment basic>
            <div className="ui two buttons">
              <Button basic color="green" onClick={() => onTriggerGenerate(id)}>
                Generate
              </Button>
              <Button basic color="red" onClick={this.handleDelete}>
                Delete
              </Button>
            </div>
          </Segment>
          <Card.Description>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Label ribbon>Random Numbers</Label>
                  </Table.Cell>
                </Table.Row>
                {numberList}
              </Table.Body>
            </Table>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

Factory.propTypes = {
  factory: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    numbers: PropTypes.array.isRequired,
    qty: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onTriggerGenerate: PropTypes.func.isRequired,
};

export default Factory;
