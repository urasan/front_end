import React, { Component, PropTypes } from 'react';
import ApiClient from './api_client';
import DislikeButton from './dislike_button';
import DislikeList from './dislike_list'

export default class Dislike extends Component {
  static propTypes = {
    threadId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {dislikeUsers: []};
  }

  componentDidMount() {
    ApiClient.fetchDislikes(this.props.threadId, this.props.messageId).then((dislikes) => {
      this.setState({dislikeUsers: dislikes.map((dislike) => dislike.user_id)});
    });
  }

  handleDislikeSubmit() {
    ApiClient.dislike(this.props.threadId, this.props.messageId, this.props.userId).then(() => {
      this.setState({dislikeUsers: this.state.dislikeUsers.concat([this.props.userId])});
    });
  }

  handleUndislikeSubmit() {
    ApiClient.undislike(this.props.threadId, this.props.messageId, this.props.userId).then(() => {
      this.setState({dislikeUsers: this.state.dislikeUsers.filter((element) => element != this.props.userId)});
    });
  }

  render() {
    return (
      <div>
        <DislikeButton
          disliked={this.isDisliked}
          onUndislikeSubmit={::this.handleUndislikeSubmit}
          onDislikeSubmit={::this.handleDislikeSubmit}
          threadId={this.props.threadId}
          messageId={this.props.messageId}
        />
        <DislikeList dislikeUsers={this.state.dislikeUsers} />
      </div>
    )
  }

  get isDisliked() {
    return this.state.dislikeUsers.includes(this.props.userId);
  }
}
