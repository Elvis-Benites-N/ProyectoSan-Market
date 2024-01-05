import { Inject, Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { APP_CONFIG, Config } from 'src/app/core/config/config';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { EncryptUtil } from 'src/app/core/utils/encrypt.util';
import { environment } from 'src/environments/environment';
import { APIService } from '../api/api.service';
import { LoginRequest, LoginResponse, UsuarioInfo } from './dto/login.dto';
import { PublicKeyRequest, PublicKeyResponse } from './dto/public-key.dto';
import { RegisterRequest } from './dto/register.dto';
import { UserConfirmationRequest } from './dto/user-confirmation.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {

  private readonly registroKey = 'c9pbFe5VxQuwDRq6PSWmhZGvkAJU3j8a7sB4EYgCdNf2XtMH';
  private readonly usuarioKey = 'z4UskgB5C7PufEZFtXxdQamrb6DhVqnML2v9pHWARwYTN8KG';

  private _usuario?: UsuarioInfo;

  constructor(
    injector: Injector,
    private readonly cookieService: CookieService,
    @Inject(APP_CONFIG)
    readonly config: Config,
  ) {
    super(injector, config.services.apigateway.url, 'auth');
    this.cargarDatos();
  }

  public get usuario(): UsuarioInfo {
    return { ...this._usuario! };
  }

  public publicKey(
    request: PublicKeyRequest,
  ): Promise<PublicKeyResponse> {
    return this.post<PublicKeyResponse, PublicKeyRequest>({
      url: 'public-key',
      request,
    });
  }

  public async register(
    request: RegisterRequest,
  ): Promise<ResponseAPI> {
    const response = await this.post<ResponseAPI, RegisterRequest>({
      url: 'register',
      request,
    });

    this.setRegistroCompletado(request.email);

    return response;
  }

  public sendVerification(
    request: PublicKeyRequest,
  ): Promise<ResponseAPI> {
    return this.post<ResponseAPI, PublicKeyRequest>({
      url: 'send-verification',
      request,
    });
  }

  public verify(
    request: UserConfirmationRequest,
  ): Promise<ResponseAPI> {
    return this.post<ResponseAPI, UserConfirmationRequest>({
      url: 'verify',
      request,
    });
  }

  private setRegistroCompletado(email: string): void {
    const hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() + 15);

    this.cookieService.set(
      environment.cookies.registro,
      EncryptUtil.encryptBase64(email, this.registroKey)!,
      {
        expires: hoy,
      }
    );
  }

  public getRegistroCompletado(): string | null {
    const emailEncrypted = this.cookieService.get(
      environment.cookies.registro,
    );

    if (!emailEncrypted) return null;

    return EncryptUtil.decryptBase64(
      emailEncrypted,
      this.registroKey
    );
  }

  public clearRegistroCompletado(): void {
    this.cookieService.delete(environment.cookies.registro);
  }

  public async login(
    request: LoginRequest
  ): Promise<ResponseAPI> {
    const response = await this.post<ResponseAPI<LoginResponse>, LoginRequest>({
      url: 'login',
      request,
    });

    this.guardarUsuario(response.data!.usuario);

    return { message: response.message };
  }























  refresh(): Observable<ResponseAPI<any>> {
    const url = `${this.baseURL}/${this.prefix}/refresh`;

    return this.http.post<ResponseAPI<any>>(url, {}).pipe(
      map((res) => {
        this.guardarDataSesion(res);

        return res;
      })
    );
  }

  private logout(): Promise<ResponseAPI> {
    return this.post<ResponseAPI, {}>({
      url: `logout`,
      request: {},
    });
  }

  public existeSesion(): boolean {
    return this._usuario !== null && this._usuario !== undefined;
  }

  cerrarSesion() {
    this._usuario = undefined;
    this.cookieService.delete(environment.cookies.usuario);
    localStorage.removeItem(environment.cookies.usuario);
    return this.logout();
  }

  private cargarDatos(): void {
    this.cargarUsuario();
  }

  private cargarUsuario(): void {
    const userInfoItem = localStorage.getItem(environment.cookies.usuario);

    if (!userInfoItem || userInfoItem.trim().length === 0) return;

    const userInfoDecrypted = EncryptUtil.decryptBase64(
      userInfoItem,
      this.usuarioKey,
    );

    if (!userInfoDecrypted || userInfoDecrypted.trim().length === 0) return;

    this._usuario = JSON.parse(userInfoDecrypted);
  }

  private guardarUsuario(usuario: UsuarioInfo): void {
    this._usuario = usuario;
    localStorage.setItem(
      environment.cookies.usuario,
      EncryptUtil.encryptBase64(
        JSON.stringify(this._usuario),
        this.usuarioKey,
      )!,
    );
  }


  private guardarDataSesion(res: ResponseAPI<any>): void {
    // this.usuario = res.data.usuario;
    // this.usuarioExtra = res.data.usuarioExtra;
    // localStorage.setItem(this.modulosUsuario, res.data.modulos);
    // localStorage.setItem(this.lsUsuarioExtraEncoded, res.data.usuarioExtraEncoded);

    // this.guardarUsuario();
    // this.guardarUsuarioExtra();
    // this.cargarModulos();
  }
}
