import React, { Component, PropTypes } from 'react';
import CommentItem from './comment_item';

export default class CommentList extends Component {
  render() {
    return (
      <ul className="comment-list">
        {this.props.comments.map(function(comment, i) {
          return <CommentItem comment={comment} key={i} />;
        })}
      </ul>
    );
  }
}
