import '../atoms/cc-flex-gap.js';
import '../molecules/cc-block.js';
import '../molecules/cc-error.js';
import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { i18n } from '../lib/i18n.js';
import { skeletonStyles } from '../styles/skeleton.js';
import { ccLink, linkStyles } from '../templates/cc-link.js';

/** @type {Statistics} */
const SKELETON_STATISTICS = {
  privateActiveUsers: 15,
  publicActiveUsers: 120,
  storage: 698980762,
  price: 17.50,
};

const HEPTAPOD_LOGO_URL = 'https://static-assets.cellar.services.clever-cloud.com/logos/heptapod.svg';

/**
 * A component that shows a summary of our Heptapod SaaS offer.
 *
 * ## Details
 *
 * * When `statistics` is nullish, a skeleton screen UI pattern is displayed (loading hint).
 *
 * @typedef {import('./types.js').Statistics} Statistics
 *
 * @cssdisplay block
 */
export class CcHeptapodInfo extends LitElement {

  static get properties () {
    return {
      error: { type: Boolean, reflect: true },
      statistics: { type: Object },
    };
  }

  constructor () {
    super();

    /** @type {boolean} Displays an error message. */
    this.error = false;

    /** @type {Statistics|null} Sets the usage statistics of this heptapod SaaS or `"not-used"` to display a message explaining the service is not used. */
    this.statistics = null;
  }

  render () {
    const skeleton = (this.statistics == null);
    const statistics = skeleton ? SKELETON_STATISTICS : this.statistics;
    const isNotUsed = (this.statistics === 'not-used');

    return html`
      <cc-block>
        <div slot="title">Heptapod</div>
        <div class="header">
          <img class="header-logo" src=${HEPTAPOD_LOGO_URL} alt="heptapod logo" title="heptapod logo">
          <div class="header-content">
            <div>Heptapod</div>
            <div>${ccLink('https://heptapod.host', 'https://heptapod.host')}</div>
          </div>
        </div>
        <div class="description">
          ${i18n('cc-heptapod-info.description')}
        </div>

        ${!this.error && !isNotUsed ? html`
          <cc-flex-gap class="pricing">
            <div class="pricing-item">
              <div class="pricing-item-value ${classMap({ skeleton })}">${statistics.privateActiveUsers}</div>
              <div>${i18n('cc-heptapod-info.private-active-users-description')}</div>
            </div>
            <div class="pricing-item">
              <div class="pricing-item-value ${classMap({ skeleton })}">${statistics.publicActiveUsers}</div>
              <div>${i18n('cc-heptapod-info.public-active-users-description')}</div>
            </div>
            <div class="pricing-item">
              <div class="pricing-item-value ${classMap({ skeleton })}">${i18n('cc-heptapod-info.storage-bytes', statistics)}</div>
              <div>${i18n('cc-heptapod-info.storage-description')}</div>
            </div>
            <div class="pricing-item">
              <div class="pricing-item-value ${classMap({ skeleton })}">${i18n('cc-heptapod-info.price-value', statistics)}</div>
              <div>${i18n('cc-heptapod-info.price-description')}</div>
            </div>
          </cc-flex-gap>
        ` : ''}

        ${!this.error && isNotUsed ? html`
          <div class="no-statistics">${i18n('cc-heptapod-info.not-in-use')}</div>
        ` : ''}

        ${this.error ? html`
          <cc-error>${i18n('cc-heptapod-info.error-loading')}</cc-error>
        ` : ''}

      </cc-block>
    `;
  }

  static get styles () {
    return [
      skeletonStyles,
      linkStyles,
      // language=CSS
      css`
        :host {
          display: block;
        }

        .header,
        .description,
        .pricing {
          line-height: 1.5;
        }

        .header {
          display: flex;
        }

        .header-logo {
          height: 3.25rem;
          width: 3.25rem;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 1rem;
        }


        .pricing {
          --cc-gap: 1rem;
        }

        .pricing-item {
          flex: 1 1 auto;
          text-align: center;
        }

        .pricing-item-value {
          display: inline-block;
          font-weight: bold;
        }

        .no-statistics {
          color: #555;
          font-style: italic;
          margin: 0.2rem;
        }

        /* SKELETON */
        .skeleton {
          background-color: #bbb;
        }
      `,
    ];
  }
}

window.customElements.define('cc-heptapod-info', CcHeptapodInfo);
