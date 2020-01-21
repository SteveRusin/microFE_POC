import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { SharedAppModule } from 'shared-app21';

import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedAppModule
  ],
  providers: [],
  entryComponents: [AppComponent],
})
export class AppModule {
  constructor(
    private _injector: Injector,
  ) {}

  ngDoBootstrap() {
    if (!customElements.get('sub-app-2')) {
      const element = createCustomElement(AppComponent, { injector: this._injector });
      customElements.define('sub-app-2', element);
    }
  }
}
