import { Component, OnInit, Compiler } from '@angular/core';
import * as AngularCore from '@angular/core';

System.set("@angular/core", System.newModule(AngularCore))
export interface System {
  import: (...args: any) => any;
  get: (id: any) => any;
  set: (id: any, module: any) => any;
  [key: string]: any;
}

declare var System: System;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mediator-app';

  constructor(
    private compiler: Compiler,
  ) { }

  ngOnInit() {
    const body = document.querySelector('body');
    const scriptsUrls = [
      'https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/custom-elements-es5-adapter.js',
      // 'http://localhost:8081/sub-vendor.js',
      // 'http://localhost:8081/sub-main.js',
    ];

    scriptsUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;

      body.appendChild(script);
    })

    this.load();
  }

  load() {
    // System.map['subApp'] = "http://localhost:8081/sub-main.js";
    System.import('http://localhost:8081/sub-app.umd.js')
      .then(module => {
      console.log('TCL: AppComponent -> load -> module', module)
       // this.compiler.compileModuleSync(module)
      })

  }
}


/*     <script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/custom-elements-es5-adapter.js"></script>
    <script type="text/javascript"
            src="http://localhost:8081/main-es2015.js"></script>
    <script type="text/javascript"
            src="http://localhost:8082/main-es2015.js"></script> */
