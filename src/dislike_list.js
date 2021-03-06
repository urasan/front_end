import React, { Component, PropTypes } from 'react';
import ApiClient from './api_client';

export default class DislikeList extends Component {
  static propTypes = {
    dislikeUsers: PropTypes.array.isRequired,
  };

  render() {
    if (this.props.dislikeUsers.length == 0) {
      return <span>まだ dislike はナイヨ</span>;
    } else {
      return (
        <p className="yj-message-likes yj-liked-by yj-thread-starter-likes yj-message-list-item--likes">
          <span className="yj-likes-text yj-message-likes--text">
            <span className="yj-hovercard-link--name" dangerouslySetInnerHTML={{ __html: this.dislikeUsers }}></span>
          </span>
        </p>
      );
    }
  }

  get dislikeUsers() {
    return this.props.dislikeUsers.join(', ');
  }
}
