import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { ErrorUtil } from 'src/app/core/utils/error.util';

@Component({
  selector: 'app-registro-completado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzAlertModule,
    NzSpaceModule,
    NzButtonModule,
    NzTypographyModule,
    TranslateModule,
  ],
  templateUrl: './registro-completado.component.html',
  styleUrls: ['./registro-completado.component.scss'],
})
export class RegistroCompletadoPage implements OnInit, OnDestroy {
  public email: string | null;

  public intervalId?: NodeJS.Timeout;
  public segundos: number;
  public isWaiting: boolean;
  public isSendingPetition: boolean;
  public errorMessage?: string;

  constructor(private readonly authService: AuthService) {
    this.isWaiting = true;
    this.segundos = 30;
    this.email = null;
    this.isSendingPetition = false;
  }

  ngOnInit(): void {
    this.email = this.authService.getRegistroCompletado();
    this.initCountdown();
  }

  private initCountdown() {
    this.isWaiting = true;
    this.segundos = 30;

    this.intervalId = setInterval(() => {
      this.segundos--;

      if (this.segundos <= 0) {
        this.isWaiting = false;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  public async sendVerification() {
    if (this.isSendingPetition) return;
    this.isSendingPetition = true;
    this.errorMessage = undefined;

    try {
      await this.authService.sendVerification({
        email: this.email!,
      });
      this.initCountdown();
    } catch (e) {
      this.errorMessage = ErrorUtil.getApiErrorMessage(e);
    } finally {
      this.isSendingPetition = false;
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
