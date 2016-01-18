import React, { PropTypes } from 'react';
import ApiClient from './api_client';
import DislikeButton from './dislike_button';
import DislikeList from './dislike_list'
import share from './share'

export default class Dislike extends React.Component {
  static propTypes = {
    threadId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {dislikeUsers: []};

    this.handleUndislikeSubmit = this.handleUndislikeSubmit.bind(this);
    this.handleDislikeSubmit = this.handleDislikeSubmit.bind(this);
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
          disliked={this.disliked(this.state.dislikeUsers, this.props.userId)}
          onUndislikeSubmit={this.handleUndislikeSubmit}
          onDislikeSubmit={this.handleDislikeSubmit}
          threadId={this.props.threadId}
          messageId={this.props.messageId}
        />
        <DislikeList dislikeUsers={this.state.dislikeUsers} />
      </div>
    )
  }

  disliked(dislikeUsers, userId) {
    return dislikeUsers.includes(userId);
  }
}
