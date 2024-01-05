import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageProvider } from 'src/app/core/controllers/providers/language/language.provider';

@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent  {

  constructor(
    public readonly sanitizer: DomSanitizer,
    public readonly languageProvider: LanguageProvider
  ) {}

}
