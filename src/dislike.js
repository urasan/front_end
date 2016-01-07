import React from "react";
import ApiClient from './api_client';
import DislikeButton from './dislike_button';
import DislikeList from './dislike_list'
import share from './share'

export default class Dislike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dislikeUsers: []};
  }

  componentDidMount() {
    ApiClient.fetchDislikes(this.props.threadId, this.props.messageId).then((dislikes) => {
      this.setState({dislikeUsers: dislikes.map((dislike) => dislike.user_id)});
    });
  }

  componentWillUnmount() {
    console.log('>>>>>>> unmount!!');
  }

  handleDislikeSubmit() {
    ApiClient.dislike(this.props.threadId, this.props.messageId, this.props.userId).then(() => {
      this.setState({dislikeUsers: this.state.dislikeUsers.concat([this.props.userId])});
    });
  }

  handleUndislikeSubmit() {
    // dislike の解除を実装
  }

  render() {
    return (
      <div>
        <DislikeButton dislikeUsers={this.state.dislikeUsers} onUndislikeSubmit={this.handleUndislikeSubmit.bind(this)} onDislikeSubmit={this.handleDislikeSubmit.bind(this)} threadId={this.props.threadId} messageId={this.props.messageId} userId={this.props.userId}/>
        <DislikeList dislikeUsers={this.state.dislikeUsers}/>
      </div>
    )
  }
}
