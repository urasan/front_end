import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Dislike from './dislike';

function getUserId() {
  return $.get('https://www.yammer.com/api/v1/users/current.json');
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

  actions.data('setDislike', true);
}

function setDislikeWhenActionButtonAppear(userId) {
  const selector = '.yj-message-list-item--action-list.yj-actions';

  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        var addedNode = mutation.addedNodes[i];

        if (typeof addedNode.querySelectorAll === 'function') {
          let nodes = addedNode.querySelectorAll(selector);
          if (nodes) {
            Array.from(nodes).forEach((node) => setDislike(node, userId));
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true, subtree: true,
  });
}

$(function() {
  getUserId().done((data) => {
    setDislikeWhenActionButtonAppear(data.name);
  });
});
