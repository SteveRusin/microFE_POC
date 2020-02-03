import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule, Store } from '@ngrx/store';
import { getShellAppReducer } from 'src/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
/*     StoreModule.forRoot({
      shellApp: getShellAppReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, name: 'micro-app-devtools' }) */
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
