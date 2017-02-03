import { Component } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';


@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/blakeparkinson';
  language = 'en';
  country = 'US';

  constructor(private api: ApiService) {

  }
}
