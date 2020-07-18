import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mediconn';

  constructor(translate: TranslateService) {
    console.log('1');
    
    translate.addLangs(['en', 'he']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
     translate.use( browserLang.match(/en|he/) ? browserLang : 'en');
    //translate.use(browserLang);

  }
}
