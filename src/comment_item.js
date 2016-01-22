import React, { Component, PropTypes } from 'react';

export default class CommentItem extends Component {
  render() {
    console.log('*******');
    console.log(this.props.comment);
    return (
      <li>
        <span>test</span>
      </li>
    )
  }
}
