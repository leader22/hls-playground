const Hls = require('hls.js');
const EventEmitter = require('events');

class Player extends EventEmitter {
  init(videoEl, channels) {
    this.videoEl  = videoEl;
    this.channels = channels;
    this.curChIdx = 0;

    this.hls = new Hls();

    this.play();
  }

  setPlayerSize({ width, height }) {
    this.videoEl.width  = width;
    this.videoEl.height = height;
  }

  play() {
    // First, dispose previous
    this.hls.stopLoad();

    const ch = this.channels[this.curChIdx];
    this.hls.loadSource(ch.src);
    this.hls.attachMedia(this.videoEl);

    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.videoEl.play();
      this.emit('play', ch);
    });
  }

  goNext() {
    if (this.curChIdx === this.channels.length - 1) {
      this.curChIdx = 0;
    } else {
      this.curChIdx++;
    }

    this.play();
  }

  goPrev() {
    if (this.curChIdx === 0) {
      this.curChIdx = this.channels.length - 1;
    } else {
      this.curChIdx--;
    }

    this.play();
  }

  volumeUp() {
    const volume = this.videoEl.volume;
    if (volume !== 1) {
      this.videoEl.volume = Math.min(1, volume + 0.1);
    }
  }

  volumeDown() {
    const volume = this.videoEl.volume;
    if (volume !== 0) {
      this.videoEl.volume = Math.max(0, volume - 0.1);
    }
  }
}

module.exports = (new Player());
