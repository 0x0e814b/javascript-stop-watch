import style from './style.js';
import template from './template.js';

class Timer extends HTMLElement {

  interval = null;
  clickHandler = null;

  initialTime = 0;
  currentTime = 0;
  timeDiff = 0;

  max = 0;
  min = 0;

  lapHistory = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.defineElements()
    this.setEventHandler();
    this.setDisplayType(0);
  }

  disconnectedCallback() {
    this.reset();
    if (this.clickHandler) {
      this._root.removeEventListener('click', this.clickHandler);
      this.clickHandler = null;
    }
  }

  defineElements() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.content.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._root = this.shadowRoot.querySelector('.stopwatch');
    this._laps = this.shadowRoot.querySelector('.stopwatch-laps__area');
    this._display = this.shadowRoot.querySelector('.stopwatch-header__display');
    this._buttons = this.shadowRoot.querySelectorAll('.stopwatch-buttons');
  }

  setDisplayType(targetIdx) {
    requestAnimationFrame(() => {
      this._buttons.forEach((buttonArea, idx) => {
        buttonArea.style.display = targetIdx === idx ? 'flex' : 'none';
      })
    })
  }

  formatTime(time) {
    return `${String(Math.floor(time / 1000)).padStart(2, '0')}:${String(Math.floor(time % 1000)).padStart(3, '0')}`;
  }

  updateTime() {
    requestAnimationFrame(() => {
      this._display.textContent = this.formatTime(this.currentTime);
    });
  }

  start() {
    if (this.interval) {
      return false;
    }
    this.initialTime = this.currentTime ? Math.floor(performance.now()) - this.currentTime : Math.floor(performance.now());
    this.interval = setInterval(() => {
      this.timeDiff = Math.floor(performance.now()) - this.initialTime;
      this.currentTime = this.timeDiff;
      this.updateTime();
    });
  }

  stop() {
    if (!this.interval) {
      return false;
    }
    clearInterval(this.interval);
    this.interval = null;
  }

  updateMinMax() {
    if (!this.max) {
      this.max = this.currentTime;
    }
    if (!this.min) {
      this.min = this.currentTime;
    }
    if (this.lapHistory.length > 1) {
      const lapDiff = this.lapHistory[this.lapHistory.length - 1] - this.lapHistory[this.lapHistory.length - 2];
      if (lapDiff >= this.max) {
        this.max = lapDiff;
      }

      if (lapDiff <= this.min) {
        this.min = lapDiff;
      }
    }
  }

  laps() {
    this.lapHistory.push(this.currentTime);
    this.updateMinMax();
    this.renderLaps();
  }

  renderLaps() {
    requestAnimationFrame(() => {
      this._laps.innerHTML = this.lapHistory.map((val, idx) => {
        const value = idx === 0 ? val : this.lapHistory[idx] - this.lapHistory[idx - 1];
        return `<li class="${value === this.min ? 'is--fastest' : value === this.max ? 'is--slowest' : ''}">Lab ${idx} <b>${this.formatTime(value)}</b></li>`;
      }).reverse().join('\n');
    });
  }

  resetValues() {
    this.initialTime = null;
    this.currentTime = null;
    this.lapHistory.length = 0;
    this.min = null;
    this.max = null;
  }

  reset() {
    this.stop();
    this.resetValues();
    this.renderLaps();
    this.updateTime();
  }

  handleStopWatchEvents({ target }) {
    const { action } = target.dataset;
    if (!action) return;
    switch (action) {
      case 'laps':
        return this.laps();
      case 'start':
        this.setDisplayType(1);
        return this.start();
      case 'stop':
        this.setDisplayType(2);
        return this.stop();
      case 'reset':
        this.setDisplayType(0);
        return this.reset();
    }
  }

  setEventHandler() {
    this.clickHandler = this.handleStopWatchEvents.bind(this);
    this._root.addEventListener('click', this.clickHandler);
  }

}

window.customElements.define('js-timer', Timer);