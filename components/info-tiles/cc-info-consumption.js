import { classMap } from 'lit-html/directives/class-map.js';
import { css, html, LitElement } from 'lit-element';
import { i18n } from '../lib/i18n.js';
import { skeleton } from '../styles/skeleton.js';
import { tileStyles } from '../styles/info-tiles.js';

/**
 * A "tile" component to display consumption info (yesterday and last 30 days)
 *
 * ## Details

 * When `consumption` is null, a skeleton screen UI pattern is displayed (loading hint)
 *
 * ## Properties
 *
 * | Property       | Attribute      | Type             | Description
 * | --------       | ---------      | ----             | -----------
 * | `consumption`  |                | `Consumption`    | Consumption info for yesterday and last 30 days
 * | `error`        | `error`        | `boolean`        | display an error message
 *
 * ### `Consumption`
 *
 * ```
 * {
 *   yesterday: number,
 *   last30Days: number,
 * }
 * ```
 *
 * *WARNING*: The "Properties" table below is broken
 *
 * @prop {Object} consumption - BROKEN
 * @attr {Boolean} error - display an error message
 */
export class CcInfoConsumption extends LitElement {

  static get properties () {
    return {
      consumption: { type: Object, attribute: false },
      error: { type: Boolean, reflect: true },
    };
  }

  static get _skeletonConsumption () {
    return {
      yesterday: 0.7,
      last30Days: 14.6,
    };
  }

  render () {

    const skeleton = (this.consumption == null);
    const { yesterday, last30Days } = skeleton ? CcInfoConsumption._skeletonConsumption : this.consumption;

    return html`
      <div class="tile_title">${i18n('cc-info-consumption.title')}</div>
      <div class="tile_body">
        
        ${!this.error ? html`
          <div class="line">
            <span>${i18n('cc-info-consumption.yesterday')}</span>
            <span class="separator"></span>
            <span class="value ${classMap({ skeleton })}">${i18n('cc-info-consumption.amount', { amount: yesterday })}</span>
          </div>
          <div class="line">
            <span>${i18n('cc-info-consumption.last-30-days')}</span>
            <span class="separator"></span>
            <span class="value ${classMap({ skeleton })}">${i18n('cc-info-consumption.amount', { amount: last30Days })}</span>
          </div>
        ` : ''}
        
        ${this.error ? html`
          <div class="tile_message">${i18n('cc-info-consumption.error')}</div>
        ` : ''}
      </div>
    `;
  }

  static get styles () {
    return [
      tileStyles,
      skeleton,
      // language=CSS
      css`
        .line {
          align-items: center;
          display: flex;
          padding: 0.5rem 0;
          width: 100%;
        }

        .separator {
          flex: 1 1 0;
          border-top: 1px dotted #8C8C8C;
          margin: 0 10px;
        }

        .value {
          font-weight: bold;
        }

        .skeleton {
          background-color: #bbb;
        }
      `,
    ];
  }
}

window.customElements.define('cc-info-consumption', CcInfoConsumption);
