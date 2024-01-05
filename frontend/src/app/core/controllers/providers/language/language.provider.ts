import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageInfo } from 'src/app/core/interfaces/language-info.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageProvider {
  public currentLanguage!: LanguageInfo;

  public readonly languages: LanguageInfo[] = [
    {
      id: 'es',
      shortName: 'ESP',
      fullName: 'ESPAÑOL',
      svg: '<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M21 0H0V14H21V0Z" fill="#D80027" /> <path d="M14 0H7V14H14V0Z" fill="#F0F0F0" /></svg>',
    },
    {
      id: 'en',
      shortName: 'ENG',
      fullName: 'ENGLISH',
      svg: '<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M0 0.0135498H20.8986V13.9864H0V0.0135498Z" fill="#F0F0F0" /> <path d="M0 1.76001H20.8985V3.50645H0V1.76001ZM0 5.25334H20.8985V6.99978H0V5.25334ZM0 8.74621H20.8985V10.4927H0V8.74621ZM0 12.2395H20.8985V13.986H0V12.2395Z" fill="#D80027" /> <path d="M0 0.0135498H10.4493V7.5374H0V0.0135498Z" fill="#2E52B2" /> <path d="M4.07447 3.09571L3.90618 3.61494H3.36183L3.8023 3.93567L3.63401 4.45486L4.07447 4.13413L4.51464 4.45486L4.34639 3.93567L4.78685 3.61494H4.24247L4.07447 3.09571ZM4.24247 5.48865L4.07447 4.96946L3.90618 5.48865H3.36183L3.8023 5.80942L3.63401 6.32861L4.07447 6.00784L4.51464 6.32861L4.34639 5.80942L4.78685 5.48865H4.24247ZM1.94196 5.48865L1.77391 4.96946L1.60562 5.48865H1.06128L1.50174 5.80942L1.33345 6.32861L1.77391 6.00784L2.21413 6.32861L2.04588 5.80942L2.48626 5.48865H1.94196ZM1.77391 3.09571L1.60562 3.61494H1.06128L1.50174 3.93567L1.33345 4.45486L1.77391 4.13413L2.21413 4.45486L2.04588 3.93567L2.48626 3.61494H1.94196L1.77391 3.09571ZM4.07447 1.22192L3.90618 1.74119H3.36183L3.8023 2.06196L3.63401 2.58115L4.07447 2.26038L4.51464 2.58115L4.34639 2.06196L4.78685 1.74119H4.24247L4.07447 1.22192ZM1.77391 1.22192L1.60562 1.74119H1.06128L1.50174 2.06196L1.33345 2.58115L1.77391 2.26038L2.21413 2.58115L2.04588 2.06196L2.48626 1.74119H1.94196L1.77391 1.22192ZM6.37498 3.09571L6.20673 3.61494H5.66239L6.10281 3.93567L5.9346 4.45486L6.37498 4.13413L6.81524 4.45486L6.64695 3.93567L7.08741 3.61494H6.54307L6.37498 3.09571ZM6.54307 5.48865L6.37498 4.96946L6.20673 5.48865H5.66239L6.10281 5.80942L5.9346 6.32861L6.37498 6.00784L6.81524 6.32861L6.64695 5.80942L7.08741 5.48865H6.54307ZM8.84362 5.48865L8.67558 4.96946L8.50729 5.48865H7.96298L8.40336 5.80942L8.23511 6.32861L8.67558 6.00784L9.11579 6.32861L8.9475 5.80942L9.38796 5.48865H8.84362ZM8.67558 3.09571L8.50729 3.61494H7.96298L8.40336 3.93567L8.23511 4.45486L8.67558 4.13413L9.11579 4.45486L8.9475 3.93567L9.38796 3.61494H8.84362L8.67558 3.09571ZM6.37498 1.22192L6.20673 1.74119H5.66239L6.10281 2.06196L5.9346 2.58115L6.37498 2.26038L6.81524 2.58115L6.64695 2.06196L7.08741 1.74119H6.54307L6.37498 1.22192ZM8.67558 1.22192L8.50729 1.74119H7.96298L8.40336 2.06196L8.23511 2.58115L8.67558 2.26038L9.11579 2.58115L8.9475 2.06196L9.38796 1.74119H8.84362L8.67558 1.22192Z" fill="#F0F0F0" /> </svg>',
    },
    {
      id: 'qc',
      shortName: 'QCH',
      fullName: 'QUECHUA',
      svg: '<svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M21 0H0V14H21V0Z" fill="#D80027" /> <path d="M14 0H7V14H14V0Z" fill="#F0F0F0" /></svg>',
    },
  ];

  constructor(private readonly translate: TranslateService) {
    this.translate.addLangs(this.languages.map<string>((e) => e.id));
    const browserLang =
      sessionStorage.getItem(environment.sessionStorage.language) ?? translate.getBrowserLang() ?? '';
    const lang = browserLang.match(/es|en|qc/) ? browserLang : 'es';
    translate.use(lang);
    this.setLanguage(lang);
  }

  public setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = this.languages.find((e) => e.id === lang) ?? this.languages[0];
    sessionStorage.setItem(environment.sessionStorage.language, lang);
  }
}
