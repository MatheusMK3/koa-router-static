module.exports = function (root, opts) {
  var send = require('koa-send');
  var path = require('path');

  var opts = opts || {};
  opts.index = opts.index || 'index.html';

  root = path.resolve(root);

  if (opts.debug) console.log('Static mounted on "%s"', root);

  return function * (next) {
    yield next;

    if (this.method != 'GET' && this.method != 'HEAD') return;
    if (this.body != null || this.status != 404) return;

    var file = this.params['0'] || '/' + opts.index;

    var requested = path.normalize(file);
    if (requested.length == 0 || requested == '/') requested = opts.index;

    yield send(this, requested, { root: root });
  }
}