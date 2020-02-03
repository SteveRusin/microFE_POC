import { Component, OnInit, NgModuleFactory, Injector, ViewChild, ViewContainerRef, PlatformRef, NgZone } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PLUGIN_EXTERNALS_MAP } from './externals';

import { Store } from '@ngrx/store';
import { AppState, getShellAppState, click } from 'src/store';

const SystemJs = window.System;
const subAppPath = 'http://localhost:8081';
const MANIFEST_PATH = `${subAppPath}/manifest.js`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mediator-app';
  @ViewChild('targetRef', { read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;
  // shellState$ = this.store.select(getShellAppState)

  constructor(
    private injector: Injector,
    private platformRef: PlatformRef,
    // private store: Store<AppState>,
  ) { }

  updateShellState() {
    //    this.store.dispatch(click());
  }

  ngOnInit() {
    this.provideExternals(PLUGIN_EXTERNALS_MAP);
    this.loadManifestSequence().then(
      () => this.load()
    )
      .then(moduleFactory => {
        (moduleFactory.moduleType as any).bootstrap(moduleFactory);
        /*         const entryComponent = (moduleFactory.moduleType as any).entry;
                const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
                this.containerRef.createComponent(compFactory); */
      }).catch((err) => console.log(err))

  }

  load<T = any>(): Promise<NgModuleFactory<T>> {
    const pluginPath = 'http://localhost:8081/sub-app.js';
    return SystemJs.import(pluginPath).then(
      module => {
        return module.default.default;
      }
    );
  }

  /*   async loadManifest() {
      const manifest: Record<string, string> = await SystemJs.import(MANIFEST_PATH).then(UMDModule => UMDModule.default.default);
      const deps = Object.entries(manifest).map(([name, url]) => this.loadDeps(name, url));

      return Promise.all(deps)
        .then(result => {
          return result.reduce((acc, { name, deps }) => {
            acc[name] = deps;
            return acc;
          }, {});
        }).then(
          map => {
            this.provideExternals(map);
            return map;
          }
        );
    } */

  async loadManifestSequence() {
    const manifest: Record<string, string> = await SystemJs.import(MANIFEST_PATH).then(UMDModule => UMDModule.default.default);
    const deps = Object.entries(manifest);

    return deps.reduce((prev, [name, url]) => {
      return prev.then(() => this.loadDeps(name, url));
    }, Promise.resolve());
  }

  private loadDeps(name, url) {
    return SystemJs.import(`${subAppPath}/${url}`).then(dep => {
      this.defineExternal(name, dep);
      return dep;
    });
  }

  private defineExternal(key, dep) {
    window.define(key, [], () => {
      return dep;
    });
  }

  provideExternals(map) {
    Object.entries(map).forEach(([key, deps]) => {
      this.defineExternal(key, deps);
    });
  }
}
