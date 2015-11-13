import React from "react";
import request from 'superagent';

export default class Dislike extends React.Component {
  render() {
    return (
      <a onClick={this.onClick} role="button" href="javascript://" title="like this message" className="yj-message-list-item--action-list-link">
        <span className="yj-message-list-item--action-list-icon yamicon yamicon-regular yamicon-rd_like"></span>
        <span className="yj-message-list-item--action-list-label" aria-hidden="true">{this.label()}</span>
        <span className="yj-message-list-item--action-list-acc yj-acc-hidden"> dislike this message</span>
      </a>
    )
  }

  onClick(evt) {
    if (!this.props.disliked) {
      // TODO dislike を登録
      new Promise(function (resolve, reject) {
        request
          .get('https://api.twitter.com/1.1/search/tweets.json?q=twitterapi')
          .end(function (res) {
            if (res.status === 404) {
              reject();
            } else {
              resolve(JSON.parse(res.text));
            }
          });
      }).then(function(dislike) {
        console.log('>>>>>>>>>>');
        console.log(dislike);
      });
    } else {
      // TODO dislike を削除
    }
  }

  label() {
    return this.props.dislike ? 'undislike' : 'dislike';
  }
}
