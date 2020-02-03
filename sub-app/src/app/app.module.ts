import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SubAppComponent } from './app.component';
import { getSubAppReducer } from 'src/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    SubAppComponent
  ],
  imports: [
    BrowserModule,
/*     StoreModule.forFeature(
      'sub-app',
      {
        count: getSubAppReducer
      }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'sub-app-devtools' }) */
  ],
  entryComponents: [SubAppComponent],
  bootstrap: [SubAppComponent]
})
export class SubAppModule {
  static entry = SubAppComponent;
  static bootstrap(entryModule) {
    return platformBrowserDynamic().bootstrapModuleFactory(entryModule)
    .then(success => console.log(`Bootstrap success`))
    .catch(err => console.error('oopts', err));
  }
}
