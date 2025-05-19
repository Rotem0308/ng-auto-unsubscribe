# NgAutoUnsubscribe

A lightweight Angular base class that helps components and services automatically unsubscribe from RxJS observables using Angular's built-in `DestroyRef` and `takeUntilDestroyed`.

> ✅ Requires Angular 16+

---

## ✨ Features

- ✅ Easy automatic unsubscription
- ✅ Tiny footprint, no dependencies
- ✅ Cleaner component and service code

---

## 📦 Installation

```bash
npm install ng-auto-unsubscribe
```

## Configuration

```ts
import { Component, OnInit } from "@angular/core";
import { NgAutoUnsubscribe } from "ng-auto-unsubscribe";
import { interval } from "rxjs";

@Component({
  selector: "app-example",
  template: `<p>Example works</p>`,
})
export class ExampleComponent extends NgAutoUnsubscribe implements OnInit {
  ngOnInit() {
    // 1. Use 'until' to automatically unsubscribe an observable in-place
    this.until(interval(1000)).subscribe((value) => {
      console.log("until:", value);
    });

    // 2. Use 'streamUntil' to get a stream with auto-unsubscription
    this.streamUntil(interval(1000)).subscribe((value) => {
      console.log("streamUntil:", value);
    });

    // 3. Use 'watchUntil' for a quick callback subscription with auto-unsubscribe
    this.watchUntil(interval(1000), (value) => {
      console.log("watchUntil:", value);
    });
  }
}
```
