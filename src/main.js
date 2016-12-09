const Hls = require('hls.js');

const { onLoad } = require('./event');

if (Hls.isSupported() === false) {
  throw new Error('This env isnt supported by hls.js');
}
window.addEventListener('load', onLoad, false);
