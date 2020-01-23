import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SubAppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
console.log('buttstrap sub app')
platformBrowserDynamic().bootstrapModule(SubAppModule)
  .catch(err => console.error(err));
