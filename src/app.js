import React from "react";
import ReactDOM from 'react-dom';
import request from 'superagent';
import Dislike from './dislike';
import DislikeList from './dislike_list'

waitForElement(".yj-message-list-item--action-list.yj-actions", 5000).then((element) => {
  let actions = $(element);
  let container = $('<li class="yj-message-list-item--action-list-item yj-message-action-list-item yj-dislike-list-item">');
  actions.append(container);
  // TODO threadId, messageId, userId を取り出す
  let current_url = window.location.href;
  // TODO dislike のステータスを付けるのを考えると、API アクセスする必要がある
  //      componentWillMount でやるか悩ましい
  ReactDOM.render(
    <Dislike />,
    container[0]
  );

  // TODO sidebar は状態によっては無いことがある
  let sidebar = $('.yj-selector-right-sidebar');
  let sideContainer = $('<div class="yj-conversation--actions"><h2 class="yj-conversation--actions-header" role="presentation"><span role="heading" aria-level="2">Dislikes</span></h2>');
  sidebar.append(sideContainer);

  let temp = $('<div role="complementary" id="commentSidebar" class="yj-thread-sidebar">');
  sidebar.append(temp);

  chrome.storage.sync.get(
    'apiUrl',
    (item) => {
      ReactDOM.render(
        <DislikeList url={item.apiUrl} />,
        temp[0]
      );
    }
  );

}).catch(console.error.bind(console));
