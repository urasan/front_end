import React from "react";
import ApiClient from './api_client';
import share from './share'

export default class Dislike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disliked: false};
  }

  componentDidMount() {
    ApiClient.fetchDislikes(this.props.threadId, this.props.messageId)
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
    //if (!this.props.disliked) {
    console.log(`${this.props.threadId} ${this.props.messageId}`);
      ApiClient.dislike(this.props.threadId, this.props.messageId, share.userId).then((dislike) => {
        console.log(`>>> ok ${dislike}`);
      });
    //} else {
    //  // TODO dislike を削除
    //}
  }

  label() {
    return this.props.dislike ? 'undislike' : 'dislike';
  }
}
