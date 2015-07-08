// Generated by CoffeeScript 1.9.3
(function() {
  var defaultHandler, deregister, exports, handlers, logEnabled, register, request;

  request = require('request');

  defaultHandler = request;

  logEnabled = false;

  handlers = {};

  exports = module.exports = function(opts, cb) {
    var method, ref, ref1, ref2, url;
    if (typeof opts === 'string') {
      url = opts;
    } else {
      url = (ref = opts.url) != null ? ref : opts.uri;
    }
    if (url.indexOf('?') !== -1) {
      url = url.slice(0, url.indexOf('?'));
    }
    method = ((ref1 = opts.method) != null ? ref1 : 'get').toLowerCase();
    if (logEnabled) {
      console.log('requestmock:', url, method, opts);
    }
    if (((ref2 = handlers[url]) != null ? ref2[method] : void 0) != null) {
      return handlers[url][method](opts, cb);
    } else {
      return defaultHandler(opts, cb);
    }
  };

  exports.defaults = function() {
    return exports;
  };

  exports.get = function(opts, cb) {
    opts.method = 'GET';
    return exports(opts, cb);
  };

  exports.post = function(opts, cb) {
    opts.method = 'POST';
    return exports(opts, cb);
  };

  exports.head = function(opts, cb) {
    opts.method = 'HEAD';
    return exports(opts, cb);
  };

  exports.put = function(opts, cb) {
    opts.method = 'PUT';
    return exports(opts, cb);
  };

  exports.patch = function(opts, cb) {
    opts.method = 'PATCH';
    return exports(opts, cb);
  };

  exports.del = function(opts, cb) {
    opts.method = 'DELETE';
    return exports(opts, cb);
  };

  exports.register = register = function(method, url, handler) {
    method = method.toLowerCase();
    if (handlers[url] == null) {
      handlers[url] = {};
    }
    return handlers[url][method] = handler;
  };

  exports.deregister = deregister = function(method, url) {
    if (url == null) {
      url = method;
      return handlers[url] = {};
    } else {
      method = method.toLowerCase();
      return delete handlers[url][method];
    }
  };

  exports.log = function(enabled) {
    return logEnabled = enabled;
  };

}).call(this);
