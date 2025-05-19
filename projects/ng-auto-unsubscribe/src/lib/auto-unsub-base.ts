import { DestroyRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, OperatorFunction } from 'rxjs';

/**
 * Abstract base class for angular components.
 * Automatically unsubscribe from RxJS observables when components destroyed, using Angular's
 * built-in `DestroyRef` and `takeUntilDestroyed`.
 *
 * Extend this class in your component to gain access to
 * convenient helper methods for automatic unsubscription.
 *
 * Example usage:
 * ```ts
 * @Component({...})
 * export class MySpecialComponent extends NgAutoUnsubscribe {
 *   ngOnInit() {
 *     this.streamUntil(this.myObservable$)
 *       .subscribe(value => {
 *         // handle value here
 *       });
 *     this.myObservable$
 *       .pipe(this.until())
 *       .subscribe(value => {
 *         // handle value here
 *       });
 *   }
 * }
 * ```
 *
 * Note: Requires Angular 16+ for `DestroyRef` and `takeUntilDestroyed`.
 */

@Directive() // Enables Angular DI for this class, required to let Angular process dependency injection in this base class
export abstract class NgAutoUnsubscribe {
  /** Injected Angular DestroyRef for unsubscription */
  protected readonly destroyRef = inject(DestroyRef);

  /**
   * Returns an operator function that applies `takeUntilDestroyed`
   * for automatic unsubscription.
   *
   * Usage:
   * ```ts
   * observable$.pipe(this.until()).subscribe();
   * ```
   */
  protected until<T>(): OperatorFunction<T, T> {
    return takeUntilDestroyed(this.destroyRef);
  }

  /**
   * Takes an observable and returns a new observable
   * that automatically unsubscribes on destroy.
   *
   * Usage:
   * ```ts
   * this.streamUntil(observable$).subscribe();
   * ```
   */
  protected streamUntil<T>(observable$: Observable<T>): Observable<T> {
    return observable$.pipe(takeUntilDestroyed(this.destroyRef));
  }

  /**
   * Subscribes to an observable and invokes a callback for each emitted value,
   * automatically unsubscribing when the component or service is destroyed.
   *
   * This is a shorthand for `.pipe(takeUntilDestroyed()).subscribe(callback)`
   * to reduce boilerplate in components or services.
   *
   * @param observable$ The observable to subscribe to.
   * @param callback Function to handle emitted values.
   *
   * Usage:
   * ```ts
   * this.watchUntil(this.myObservable$, value => {
   *   // handle value here
   * });
   * ```
   */
  protected watchUntil<T>(
    observable$: Observable<T>,
    callback: (value: T) => void
  ): void {
    observable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((valueFromObs) => callback(valueFromObs));
  }
}
