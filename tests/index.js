'use strict';

const should = require('chai').should();
const Hexo = require('hexo');
const HexoUuid = require('../lib/hexo-uuid');

const hexo = new Hexo(__dirname, {
  silent: true
});

hexo.on('new', HexoUuid);

describe('Post With User Pre-defined UUID Attribute', () => {

  let post = {
    path: false,
    content: `---
title: I love Hexo!
uuid:
date: 2016-05-20 16:20
tags:
---
    `
  };

  hexo.emit('new', post);

  it('Post should have uuid', () => {
    let uuidPresence = /uuid: .{36}\n/.test(post.content);
    uuidPresence.should.equal(true);
  });

});

describe('Post Without User Pre-defined UUID Attribute', () => {

  let post = {
    path: './tmp/test.md',
    content: `---
title: I love Hexo!
date: 2016-05-20 16:20
tags:
---
    `
  };

  hexo.emit('new', post);

  it('Post should have uuid', () => {
    let uuidPresence = /uuid: .{36}\n/.test(post.content);
    uuidPresence.should.equal(true);
  });

});
