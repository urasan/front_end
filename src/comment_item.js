import React from 'react';

export default class CommentItem extends React.Component {
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
