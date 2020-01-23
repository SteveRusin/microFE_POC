import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { SubAppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    SubAppComponent
  ],
  imports: [
    BrowserModule,
/*     StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }), */
  ],
  providers: [],
  entryComponents: [SubAppComponent]
})
export class SubAppModule implements DoBootstrap {
  constructor(
    private _injector: Injector,
  ) {
    console.log('init sub AppModule')
  }

  ngDoBootstrap() {
    console.log('butstrap sub AppModule')
    if (!customElements.get('sub-app')) {
      const element = createCustomElement(SubAppComponent, { injector: this._injector });
      customElements.define('sub-app', element);
    }
  }
}

