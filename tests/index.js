'use strict';

const should = require('chai').should();
const Hexo = require('hexo');
const HexoUuid = require('../lib/hexo-uuid');

const hexo = new Hexo(__dirname, {
  silent: true
});

hexo.on('new', HexoUuid.newPost);

describe('Post With User Pre-defined UUID Attribute on new post', () => {

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

describe('Post Without User Pre-defined UUID Attribute on new post', () => {

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

hexo.extend.filter.register('before_post_render', HexoUuid.before_renderPost);

describe('Post With User Pre-defined UUID Attribute before render', () => {

  let post = {
    layout:'post',
    uuid: '7848d740-fd9a-11e7-ba72-ab02344a9ad8',
    full_source: './tmp/test.md',
    raw: `'---
uuid: 7848d740-fd9a-11e7-ba72-ab02344a9ad8
title: I love Hexo!
date: 2016-05-20 16:20
tags:
---
test
    `
  };

  hexo.extend.filter.exec('before_post_render', post);

  it('Post should have uuid', () => {
    let uuidPresence = /uuid: .{36}\n/.test(post.raw);
    uuidPresence.should.equal(true);
  });

});

describe('Post Without User Pre-defined UUID Attribute before render', () => {

  let post = {
    layout:'post',
    full_source: './tmp/test.md',
    raw: `'---
title: I love Hexo!
date: 2016-05-20 16:20
tags:
---
test
    `
  };

  hexo.extend.filter.exec('before_post_render', post);

  it('Post should have uuid', () => {
    let uuidPresence = /uuid: .{36}\n/.test(post.raw);
    uuidPresence.should.equal(true);
  });

});

describe('Post With User Pre-defined UUID Attribute but blank before render', () => {

  let post = {
    uuid: '',
    layout:'post',
    full_source: './tmp/test.md',
    raw: `'---
uuid:
title: I love Hexo!
date: 2016-05-20 16:20
tags:
---
test
    `
  };

  hexo.extend.filter.exec('before_post_render', post);

  it('Post should have uuid', () => {
    let uuidPresence = /uuid: .{36}\n/.test(post.raw);
    uuidPresence.should.equal(true);
  });

});
