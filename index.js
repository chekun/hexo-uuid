'use strict';

const HexoUuid = require('./lib/hexo-uuid');

hexo.on('new', HexoUuid.newPost);

hexo.extend.filter.register('before_post_render', HexoUuid.before_renderPost);
