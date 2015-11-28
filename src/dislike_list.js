import React from 'react';
import request from 'superagent';

export default class DislikeList extends React.Component {
  componentDidMount() {
    new Promise((resolve, reject) => {
      request
        .get(this.props.url)
        .end(function (err, res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    }).then((dislike) => {
      this.setState({dislikes: dislike});
    });
  }

  render() {
    if (this.state == null) {
      return <span>loading...</span>
    } else {
      return (
        <ul className="dislike-list yj-conversation--quick-links yj-quick-links-list yj-clearfix">
          {this.state.dislikes.map(function(dislike, i) {
            return <li key={i} dangerouslySetInnerHTML={{__html: dislike.user_id}}></li>;
          })}
        </ul>
      )
    }
  }
}
