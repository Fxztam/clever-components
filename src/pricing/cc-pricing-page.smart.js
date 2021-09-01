import './cc-pricing-page.js';
import '../smart/cc-smart-container.js';
import { fetchAllZones } from '../lib/api-helpers.js';
import { fromCustomEvent, LastPromise, unsubscribeWithSignal } from '../lib/observables.js';
import { defineComponent } from '../lib/smart-manager.js';

defineComponent({
  selector: 'cc-pricing-page',
  params: {
    currency: { type: Object },
    zoneId: { type: String },
  },
  onConnect (container, component, context$, disconnectSignal) {

    const zones_lp = new LastPromise();

    const onCurrencyChanged$ = fromCustomEvent(component, 'cc-pricing-page:change-currency');
    const onZoneChanged$ = fromCustomEvent(component, 'cc-pricing-page:change-zone');

    unsubscribeWithSignal(disconnectSignal, [
      zones_lp.error$.subscribe(console.error),
      zones_lp.value$.subscribe((zones) => {
        component.zones = zones;
      }),
      context$.subscribe(({ zoneId }) => {
        component.zoneId = zoneId;
      }),
      onZoneChanged$.subscribe((zoneId) => {
        container.context = { ...container.context, zoneId };
      }),
      onCurrencyChanged$.subscribe((currency) => {
        container.context = { ...container.context, currency };
      }),
      context$.subscribe(({ currency }) => {
        if (currency != null) {
          component.currency = currency;
        }
      }),
    ]);
    zones_lp.push((signal) => fetchAllZones({ signal }));
  },

});
