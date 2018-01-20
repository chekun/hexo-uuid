'use strict';

const uuid = require('uuid');
const fs = require('fs');

module.exports.newPost = (post) => {

  let lines = post.content.split('\n');
  let index = lines.findIndex(item => item === 'uuid:');
  if (index > -1) {
    lines[index] += (' ' + uuid.v1());
  } else {
    lines.splice(1, 0, 'uuid: ' + uuid.v1());
  }

  post.content = lines.join('\n');
  if (post.path !== false) {
    fs.writeFile(post.path, post.content);
  }

};

module.exports.before_renderPost = (post) => {
  if (post.layout == 'post' && !post.uuid) {
    let lines = post.raw.split('\n');
    lines.splice(1, 0, 'uuid: ' + uuid.v1());
    post.raw = lines.join('\n');
    if (post.full_source !== false) {
      fs.writeFile(post.full_source, post.raw);
    }
  }
};