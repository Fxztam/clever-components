import {
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  interval,
  map,
  merge,
  multicast,
  Observable,
  of,
  sample,
  scan,
  share,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';

export function unsubscribeWithSignal (signal, subscriptions) {
  signal.addEventListener('abort', () => {
    subscriptions.forEach((s) => s.unsubscribe());
  }, { once: true });
}

export function fromCustomEvent (...params) {
  return fromEvent(...params).pipe(map((event) => event.detail));
}

export class LastPromise {

  constructor (signal) {

    this._source$ = new Subject();
    this.value$ = new Subject();
    this.error$ = new Subject();

    const all$ = this._source$.pipe(
      switchMap((createPromise) => {
        const ac = new window.AbortController();
        if (signal != null) {
          signal.addEventListener('abort', () => ac.abort(), { once: true });
        }
        const promise = createPromise(ac.signal);
        return new Observable((subscriber) => {
          promise
            .then((value) => subscriber.next([null, value]))
            .catch((error) => subscriber.next([error]))
            .finally(() => subscriber.complete());
          return () => ac.abort();
        });
      }),
      share(),
    );

    all$
      .pipe(
        filter(([error]) => error == null),
        map(([$, value]) => value),
      )
      .subscribe(this.value$);

    all$
      .pipe(
        filter(([error]) => error != null),
        map(([error]) => error),
      )
      .subscribe(this.error$);
  }

  push (createPromise) {
    if (this.value$.observers.length > 0 || this.error$.observers.length > 0) {
      this._source$.next(createPromise);
    }
    else {
      // TODO: Should we console.warn if there are no observers?
    }
  }
}

export {
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  interval,
  map,
  merge,
  multicast,
  Observable,
  of,
  sample,
  scan,
  share,
  Subject,
  switchMap,
  withLatestFrom,
};
