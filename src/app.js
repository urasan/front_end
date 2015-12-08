import React from "react";
import ReactDOM from 'react-dom';
import request from 'superagent';
import Dislike from './dislike';
import DislikeList from './dislike_list'
import share from './share'

function getUserId() {
  let user_url = $("a[data-qaid='user_name_link']")[0].href;
  let re = /https:\/\/www.yammer.com\/.*\/users\/(.*)/;
  return user_url.match(re)[1];
}

$(function() {
  waitForElement('.yj-nav-menu--user-info-item', 5000).then((_element) => {
    share.userId = getUserId();

    waitForElement(".yj-message-list-item--action-list.yj-actions", 5000).then((element) => {
      let actions = $(element);
      let container = $('<li class="yj-message-list-item--action-list-item yj-message-action-list-item yj-dislike-list-item">');
      actions.append(container);
      // TODO threadId, messageId, userId を取り出す
      let threadId = $(actions.parents('.yj-thread-list-item')[0]).data('thread-id');
      let messageId = $(actions.parents('.yj-message-list-item')[0]).data('message-id');

      console.log(`${threadId} ${messageId}`);
      // TODO dislike のステータスを付けるのを考えると、API アクセスする必要がある
      //      componentWillMount でやるか悩ましい
      ReactDOM.render(
        <Dislike threadId={threadId} messageId={messageId} userId={share.userId}/>,
        container[0]
      );

      // TODO sidebar は状態によっては無いことがある
      let sidebar = $('.yj-selector-right-sidebar');
      let sideContainer = $('<div class="yj-conversation--actions"><h2 class="yj-conversation--actions-header" role="presentation"><span role="heading" aria-level="2">Dislikes</span></h2>');
      sidebar.append(sideContainer);

      let temp = $('<div role="complementary" id="commentSidebar" class="yj-thread-sidebar">');
      sidebar.append(temp);

      let dislikeListContainer = $('<div>');
      actions.parent().append(dislikeListContainer);
      ReactDOM.render(
        <DislikeList threadId={threadId} messageId={messageId} />,
        dislikeListContainer[0]
      );

    }).catch(console.error.bind(console));
  });
});

