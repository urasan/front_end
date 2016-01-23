import React, { Component, PropTypes } from 'react';
import CommentItem from './comment_item';

export default class CommentList extends Component {
  render() {
    console.log('>>>> inner comment_list');
    console.dir(this.props.comments);
    return (
      <ul className="comment-list">
        {this.props.comments.map(function(comment, i) {
          console.log('>>> inner comment!');
          console.log(comment);
          return <CommentItem comment={comment} key={i} />;
        })}
      </ul>
    );
  }
}
