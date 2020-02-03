import * as core from '@angular/core';
import * as common from '@angular/common';
import * as forms from '@angular/forms';
import * as router from '@angular/router';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import * as tslib from 'tslib';
import * as store from '@ngrx/store';
import * as devTools from '@ngrx/store-devtools';

export const PLUGIN_EXTERNALS_MAP = {
  'ng.core': core,
  'ng.common': common,
  'ng.forms': forms,
  'ng.router': router,
  'ngrx.store': store,
  'ngrx.devTools': devTools,
  'rxjs/operators': rxjsOperators,
  rxjs,
  tslib
};
