import React from "react";
import ReactDOM from 'react-dom';
import Dislike from './dislike';
import CommentList from './comment_list'

waitForElement(".yj-message-list-item--action-list.yj-actions", 5000).then(function (element) {
  console.log('<<< wait!');
  let actions = $(element);
  let container = $('<li class="yj-message-list-item--action-list-item yj-message-action-list-item yj-dislike-list-item">');
  actions.append(container);
  // TODO threadId, messageId, userId を取り出す
  let current_url = window.location.href;
  // TODO dislike のステータスを付けるのを考えると、API アクセスする必要がある
  //      componentWillMount でやるか悩ましい
  console.log('<<< dislike');
  ReactDOM.render(
    <Dislike />,
    container[0]
  );
  let sidebar = $('.yj-selector-right-sidebar');
  let temp = $('<div role="complementary" id="commentSidebar" class="yj-thread-sidebar">');
  sidebar.append(temp);
  if (sidebar.length == 0) {
    let sidebarArea = $('<div class="yj-selector-right-sidebar yk-col-sm-5 yk-col-md-6 yk-col-lg-6">');
  }
  let sideContainer = $('<div class="yj-conversation--actions"><h2 class="yj-conversation--actions-header" role="presentation"><span role="heading" aria-level="2">Conversation Actions</span></h2>');
  let threadSidebar = $('.yj-thread-sidebar');

  let json = [
    {
      "key": 1, "body": 'test', "user_name": 'mase'
    },
    {
      "key": 2, "body": 'test2', "user_name": 'mase'
    }
  ];
  console.log('<<< comment_list!');
  console.dir(threadSidebar);
  ReactDOM.render(
    <CommentList comments={json} />,
    temp[0]
  );
}).catch(console.error.bind(console));
