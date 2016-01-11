import React from "react";
import ReactDOM from 'react-dom';
import request from 'superagent';
import Dislike from './dislike';
import share from './share'

function getUserId() {
  let user_url = $("a[data-qaid='user_name_link']")[0].href;
  let re = /https:\/\/www.yammer.com\/.*\/users\/(.*)/;
  return user_url.match(re)[1];
}

// FIXME 現在未使用
function setSidebar() {
  // TODO sidebar は状態によっては無いことがある
  let sidebar = $('.yj-selector-right-sidebar');
  let sideContainer = $('<div class="yj-conversation--actions"><h2 class="yj-conversation--actions-header" role="presentation"><span role="heading" aria-level="2">Dislikes</span></h2>');
  sidebar.append(sideContainer);

  let temp = $('<div role="complementary" id="commentSidebar" class="yj-thread-sidebar">');
  sidebar.append(temp);
}

function setDislike(element, userId) {
  let actions = $(element);

  if (actions.data('setDislike'))
    return;

  let container = $('<li class="yj-message-list-item--action-list-item yj-message-action-list-item yj-dislike-list-item">');
  actions.append(container);

  let threadId = $(actions.parents('.yj-thread-list-item')[0]).data('thread-id');
  let messageId = $(actions.parents('.yj-message-list-item')[0]).data('message-id');

  let dislikeListContainer = $('<div>');
  actions.parent().append(dislikeListContainer);

  ReactDOM.render(
    <Dislike threadId={threadId} messageId={messageId} userId={userId}/>,
    dislikeListContainer[0]
  );

  actions.data('setDislike', true)
}

function setDislikeWhenActionButtonAppear() {
  const selector = '.yj-message-list-item--action-list.yj-actions';

  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        var addedNode = mutation.addedNodes[i];

        if (typeof addedNode.querySelectorAll === "function") {
          let nodes = addedNode.querySelectorAll(selector);
          if (nodes) {
            Array.from(nodes).forEach((node) => setDislike(node, share.userId));
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true, subtree: true
  });
}

$(function() {
  waitForElement('.yj-nav-menu--user-info-item', 5000).then((_element) => {
    share.userId = getUserId();

    setDislikeWhenActionButtonAppear();
  });
});
