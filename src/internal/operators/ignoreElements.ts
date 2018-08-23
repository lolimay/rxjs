import { Observable } from '../Observable';
import { Operation, FOType, Sink, SinkArg } from '../types';
import { Subscription } from '../Subscription';
import { lift } from '../util/lift';

export function ignoreElements<T>(): Operation<T, never> {
  return lift((source: Observable<T>, dest: Sink<never>, subs: Subscription) => {
    source(FOType.SUBSCRIBE, (t: FOType, v: SinkArg<T>, subs: Subscription) => {
      if (t !== FOType.NEXT) {
        dest(t, v, subs);
      }
    }, subs);
  });
}
