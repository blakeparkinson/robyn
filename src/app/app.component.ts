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

  toggleLanguage(): void {
    this.language == 'en' ? this.language = 'it' : this.language = 'en';
    this.country == 'US' ? this.country = 'IT' : this.country = 'US';

    this.locale.setCurrentLocale(this.language, this.country);

  }

  constructor(private api: ApiService, public locale: LocaleService, public localization: LocalizationService) {
    var translationEN = {
      TITLE: 'English Test'
    };
    var translationIT = {
      TITLE: 'Italian Test'
    };
    // Adds the languages (ISO 639 two-letter or three-letter code).
    this.locale.addLanguages(['en', 'it']);

    // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
    // Selects the default language and country, regardless of the browser language, to avoid inconsistencies between the language and country.
    this.locale.definePreferredLocale('en', 'US', 30);

    // Optional: default currency (ISO 4217 three-letter code).
    this.locale.definePreferredCurrency('USD');
    this.localization.addTranslation('en', translationEN);
    this.localization.addTranslation('it', translationIT);


    this.localization.updateTranslation(); // Need to update the translation.

  }
}
