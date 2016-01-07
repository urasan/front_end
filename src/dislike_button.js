import React from "react";
import ApiClient from './api_client';

export default class DislikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disliked: props.dislikeUsers.includes(props.userId)};
  }

  componentWillUnmount() {
    console.log('>>>>>>> unmount!!');
  }

  render() {
    return (
      <a onClick={this.onClick.bind(this)} role="button" href="javascript://" title="like this message" className="yj-message-list-item--action-list-link">
        <span className="yj-message-list-item--action-list-icon yamicon yamicon-regular yamicon-rd_like"></span>
        <span className="yj-message-list-item--action-list-label" aria-hidden="true">{this.label()}</span>
        <span className="yj-message-list-item--action-list-acc yj-acc-hidden"> dislike this message</span>
      </a>
    )
  }

  onClick() {
    if (this.state.disliked) {
      this.props.onUndislikeSubmit();
    } else {
      this.props.onDislikeSubmit();
    }
  }

  label() {
    return (this.state.disliked) ? 'undislike' : 'dislike';
  }
}
