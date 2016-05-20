'use strict';

const HexoUuid = require('./lib/hexo-uuid');

hexo.on('new', HexoUuid);
