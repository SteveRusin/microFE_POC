import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SkipSelf, Injector, InjectFlags, Inject, InjectionToken } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

import { SubAppComponent } from './app.component';
import { getSubAppReducer, AppState } from 'src/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
export class ShellStore extends Store<any> {

}
@NgModule({
  declarations: [
    SubAppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      count: getSubAppReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'sub-app-devtools' })
  ],
  entryComponents: [SubAppComponent],
  providers: [
    {
      provide: ShellStore,
      useExisting: 'parentStore'
    }
  ],
  bootstrap: [SubAppComponent]
})
export class SubAppModule {
  static entry = SubAppComponent;
}

export const manifest = {
  lol: 'lol'
}
