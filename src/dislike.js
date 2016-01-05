import React from "react";
import ApiClient from './api_client';
import DislikeButton from './dislike_button';
import DislikeList from './dislike_list'
import share from './share'

export default class Dislike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dislikes: []};
  }

  componentDidMount() {
    ApiClient.fetchDislikes(this.props.threadId, this.props.messageId).then((dislikes) => {
      this.setState({dislikes: dislikes});
    });
  }

  componentWillUnmount() {
    console.log('>>>>>>> unmount!!');
  }

  render() {
    return (
      <div>
        <DislikeButton dislikes={this.state.dislikes} threadId={this.props.threadId} messageId={this.props.messageId} userId={share.userId}/>
        <DislikeList dislikes={this.state.dislikes}/>
      </div>
    )
  }
}
