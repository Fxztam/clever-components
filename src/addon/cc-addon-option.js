import '../atoms/cc-img.js';
import '../atoms/cc-toggle.js';
import { css, html, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { dispatchCustomEvent } from '../lib/events.js';
import { i18n } from '../lib/i18n.js';

/**
 * A component that allows to enable or disable an add-on option.
 *
 * ## Technical details
 *
 * * If you want to display a warning in the option, add the `option-warning` class to an HTML element. It will be displayed with a custom color and in italic.
 *
 * @cssdisplay grid
 *
 * @event {CustomEvent<boolean>} cc-addon-option:input - Fires when the option is enabled or disabled.
 *
 * @slot - The content of the option's description (text or HTML).
 */
export class CcAddonOption extends LitElement {

  static get properties () {
    return {
      enabled: { type: Boolean, reflect: true },
      logo: { type: String },
      title: { type: String },
    };
  }

  constructor () {
    super();

    /** @type {boolean} Enable the option by default. */
    this.enabled = false;

    /** @type {string|null} The logo URL of the option. */
    this.logo = null;

    /** @type {string|null} Title of the option. */
    this.title = null;
  }

  _onToggleOption ({ detail: enabled }) {
    this.enabled = (enabled === 'ENABLED');
    dispatchCustomEvent(this, 'input', this.enabled);
  }

  render () {
    const choices = [
      { label: i18n('cc-addon-option.disabled'), value: 'DISABLED' },
      { label: i18n('cc-addon-option.enabled'), value: 'ENABLED' },
    ];

    return html`
      <cc-img class="logo" src=${ifDefined(this.logo ?? undefined)}></cc-img>
      <div class="option-main">
        <div class="option-name">${this.title}</div>
        <slot class="option-details"></slot>
        <cc-toggle .choices=${choices} value=${this.enabled ? 'ENABLED' : 'DISABLED'} @cc-toggle:input=${this._onToggleOption}></cc-toggle>
      </div>
    `;
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
          border-radius: 0.25rem;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: min-content 1fr;
          padding: 1rem;
        }

        ::slotted(.option-warning) {
          color: #555;
          font-style: italic;
        }

        .option-main {
          display: grid;
          grid-gap: 0.5rem;
        }

        .option-name {
          font-weight: bold;
          line-height: 1.6;
          min-height: 1.6rem;
        }

        :host(:not([enabled])) {
          background-color: #f8f8f8;
          border: 2px solid #f8f8f8;
        }

        :host([enabled]) {
          border: 2px solid hsl(144, 56%, 43%);
        }

        .logo {
          border-radius: 0.25rem;
          height: 1.6rem;
          width: 1.6rem;
        }

        cc-toggle {
          justify-self: end;
          margin-top: 0.5rem;
        }

        :host([enabled]) cc-toggle {
          --cc-toggle-color: hsl(144, 56%, 43%);
        }

        .option-details {
          line-height: 1.5;
        }
      `,
    ];
  }
}

window.customElements.define('cc-addon-option', CcAddonOption);
