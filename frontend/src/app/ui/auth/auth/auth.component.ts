import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageProvider } from 'src/app/core/controllers/providers/language/language.provider';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('authCard')
  authCard!: ElementRef<HTMLDivElement>;

  public isOpenSelectLanguage = false;

  constructor(
    public readonly sanitizer: DomSanitizer,
    public readonly languageProvider: LanguageProvider,
  ) {}

  ngOnInit(): void {}

  cambiarPanel() {
    this.authCard.nativeElement.classList.toggle('right-panel-active');
  }

  changeLanguage(id: string) {
    this.languageProvider.setLanguage(id);
    this.isOpenSelectLanguage = false;
  }
}
