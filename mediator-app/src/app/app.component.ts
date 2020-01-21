import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mediator-app';

  constructor() {}

  ngOnInit() {
    const body = document.querySelector('body');
    const scriptsUrls = [
      'https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/custom-elements-es5-adapter.js',
      'http://localhost:8081/main-es2015.js',
      'http://localhost:8082/main-es2015.js',
    ];

    scriptsUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;

      body.appendChild(script);
    })
  }
}


/*     <script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/custom-elements-es5-adapter.js"></script>
    <script type="text/javascript"
            src="http://localhost:8081/main-es2015.js"></script>
    <script type="text/javascript"
            src="http://localhost:8082/main-es2015.js"></script> */
