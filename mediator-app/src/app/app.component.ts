import { Component, OnInit, NgModuleFactory, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { PLUGIN_EXTERNALS_MAP } from './externals';

import { Store } from '@ngrx/store';
import { AppState, getShellAppState, click } from 'src/store';

const SystemJs = window.System;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mediator-app';
  @ViewChild('targetRef', { read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;
  shellState$ = this.store.select(getShellAppState)

  constructor(
    private injector: Injector,
    private store: Store<AppState>,
  ) { }

  updateShellState() {
    this.store.dispatch(click());
  }

  ngOnInit() {
    this.provideExternals();
    this.load().then(moduleFactory => {
      const moduleRef = moduleFactory.create(this.injector);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
      this.containerRef.createComponent(compFactory);
    });

  }

  load<T = any>(): Promise<NgModuleFactory<T>> {
    const pluginPath = 'http://localhost:8081/sub-app.js';
    return SystemJs.import(pluginPath).then(
      module => {
        debugger;
        return module.default.default;
      }
    );
  }

  provideExternals() {
    Object.keys(PLUGIN_EXTERNALS_MAP).forEach(externalKey => {
      window.define(externalKey, [], () => {
        return PLUGIN_EXTERNALS_MAP[externalKey];
      })
    }
    );
  }
}
