import './todo.styl';
import Component from 'react-addons-pure-render-mixin';
import React, {PropTypes} from 'react';

export default class Todo extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
  }

  render() {
    const {actions, todo} = this.props;

    return (
      <li className="todo">
        <span className="view">{todo.title}</span>
        <span
          className="button"
          onClick={() => actions.deleteTodo(todo.id)}
        >x</span>
      </li>
    );
  }

}
