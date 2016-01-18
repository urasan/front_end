import React, { PropTypes } from 'react';
import ApiClient from './api_client';
import Icon from 'react-fa';

export default class DislikeButton extends React.Component {
  static propTypes = {
    disliked: PropTypes.bool.isRequired,
    onUndislikeSubmit: PropTypes.func.isRequired,
    onDislikeSubmit: PropTypes.func.isRequired
  };

  render() {
    return (
      <a onClick={this.onClick.bind(this)} role="button" href="javascript://" title="dislike this message" className="yj-message-list-item--action-list-link">
        <Icon spin name="thumbs-down" />
        <span className="yj-message-list-item--action-list-label" aria-hidden="true">{this.label()}</span>
        <span className="yj-message-list-item--action-list-acc yj-acc-hidden"> dislike this message</span>
      </a>
    )
  }

  onClick() {
    if (this.props.disliked) {
      this.props.onUndislikeSubmit();
    } else {
      this.props.onDislikeSubmit();
    }
  }

  label() {
    return (this.props.disliked) ? 'undislike' : 'dislike';
  }
}
