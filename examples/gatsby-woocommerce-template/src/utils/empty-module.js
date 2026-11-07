// Empty module to replace node-fetch and whatwg-url during SSR build
// Fix whatwg-url compatibility issue in webpack build-html stage

const noop = () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) });

// Mock whatwg-url basic exports
module.exports = noop;
module.exports.default = noop;
module.exports.URL = class URL {
  constructor(url) {
    this.href = url;
  }
};
module.exports.URLSearchParams = class URLSearchParams {};
module.exports.parseURL = () => ({});
module.exports.serializeURL = () => '';
module.exports.serializeURLOrigin = () => '';
