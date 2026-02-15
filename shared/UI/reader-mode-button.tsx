// reader-mode-button.js
// version: 0.1.0

(function () {
  'use strict';

  class ReaderModeButton extends HTMLElement {
    constructor() {
      super();
      this._enabled = false;

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          button {
            position: fixed;
            right: 16px;
            bottom: 16px;
            z-index: 999999;
            padding: 8px 12px;
            font-size: 14px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            background: #111;
            color: #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }

          button[data-enabled="true"] {
            background: #2a7fff;
          }
        </style>

        <button type="button"></button>
      `;
    }

    connectedCallback() {
      this._button = this.shadowRoot.querySelector('button');
      this._button.addEventListener('click', () => this._toggle());
      this._render();
    }

    disconnectedCallback() {
      this._button?.removeEventListener('click', this._toggle);
    }

    _toggle() {
      this._enabled = !this._enabled;
      this._render();

      this.dispatchEvent(new CustomEvent('vm-reader-mode-toggle', {
        detail: { enabled: this._enabled },
        bubbles: true,
        composed: true
      }));
    }

    _render() {
      this._button.dataset.enabled = String(this._enabled);
      this._button.textContent = this._enabled ? 'ReaderMode ON' : 'ReaderMode OFF';
    }

    // Public API
    set enabled(value) {
      this._enabled = Boolean(value);
      this._render();
    }

    get enabled() {
      return this._enabled;
    }
  }

  if (!customElements.get('reader-mode-button')) {
    customElements.define('reader-mode-button', ReaderModeButton);
  }

  // Optional helper
  window.createReaderModeButton = function () {
    const btn = document.createElement('reader-mode-button');
    document.body.appendChild(btn);
    return btn;
  };
})();