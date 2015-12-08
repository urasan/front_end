import React from 'react';
import ApiClient from './api_client';

export default class DislikeList extends React.Component {
  componentDidMount() {
    ApiClient.fetchDislikes(this.props.threadId, this.props.messageId).then((dislike) => {
      this.setState({dislikes: dislike});
    });
  }

  render() {
    if (this.state == null) {
      return <span>loading...</span>
    } else {
      return (
        <p className="yj-message-likes yj-liked-by yj-thread-starter-likes yj-message-list-item--likes">
          <span className="yj-likes-text yj-message-likes--text">
            {this.state.dislikes.map(function(dislike, i) {
              return <span className="yj-hovercard-link--name" key={i} dangerouslySetInnerHTML={{__html: dislike.user_id}}></span>
            })}
          </span>
        </p>
      )
    }
  }
}
