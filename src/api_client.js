import request from 'superagent';

class ApiClient {
  constructor() {
    chrome.storage.sync.get(
      'apiUrl',
      (item) => {
        this._url = item.apiUrl;
      }
    );
  }

  fetchDislikes(threadId, messageId) {
    return new Promise((resolve, reject) => {
      request
        .get(`${this._url}/threads/${threadId}/messages/${messageId}/dislikes`)
        .end(function(err, res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }

  dislike(threadId, messageId, userId) {
    return this._postToDislike('create', threadId, messageId, userId);
  }

  undislike(threadId, messageId, userId) {
    return this._postToDislike('destroy', threadId, messageId, userId);
  }

  _postToDislike(action, threadId, messageId, userId) {
    return new Promise((resolve, reject) => {
      request
        .post(`${this._url}/threads/${threadId}/messages/${messageId}/dislikes/${action}`)
        .send({ user_id: userId })
        .end(function(err, res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve();
          }
        });
    });
  }
}

export default new ApiClient();
