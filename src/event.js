const { channels } = require('./const');
const player = require('./player');

const Event = {
  onLoad() {
    Event._showInfo('Loading...');

    const video = document.createElement('video');

    const distEl = document.getElementById('jsVideo');
    distEl.innerHTML = '';
    distEl.appendChild(video);

    player.init(video, channels);
    player.setPlayerSize({
      width:  window.innerWidth,
      height: window.innerWidth / 16 * 9,
    });
    player.on('play', Event.onPlayChannel);

    document.addEventListener('keydown', Event.onKeyDown, false);
    window.addEventListener('resize', Event.onResize, false);
  },

  onKeyDown(ev) {
    switch (ev.keyCode) {
    case 37:
      ev.preventDefault();
      Event._showInfo('Loading...');
      player.goPrev();
      break;
    case 38:
      ev.preventDefault();
      player.volumeUp();
      break;
    case 39:
      ev.preventDefault();
      Event._showInfo('Loading...');
      player.goNext();
      break;
    case 40:
      ev.preventDefault();
      player.volumeDown();
      break;
    default: return;
    }
  },

  onResize() {
    player.setPlayerSize({
      width:  window.innerWidth,
      height: window.innerWidth / 16 * 9,
    });
  },

  onPlayChannel({ name, desc }) {
    Event._showInfo(`${name}\n${desc}`);
  },

  _showInfo(text) {
    const infoEl = document.getElementById('jsInfo');
    infoEl.textContent = text;
  }
};

module.exports = Event;
