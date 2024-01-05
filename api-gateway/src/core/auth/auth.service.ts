import { ACCESS_TOKEN_KEY, MICROSERVICES, REFRESH_TOKEN_KEY } from '@Constants';
import { ResponseAPI } from '@Interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { LoginRequest, LoginResponse, RefreshInfo, Tokens, UsuarioInfo } from './dto/login.dto';
import { PublicKeyRequest, PublicKeyResponse } from './dto/public-key.dto';
import { RegisterRequest } from './dto/register.dto';
import { UserConfirmationRequest } from './dto/user-confirmation.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(MICROSERVICES.ACCESO.NAME)
        private readonly msAcceso: ClientKafka,
    ) { }

    publicKey(
        request: PublicKeyRequest,
    ): Observable<PublicKeyResponse> {
        return this.msAcceso.send<
            PublicKeyResponse,
            PublicKeyRequest
        >(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.PUBLIC_KEY,
            request
        );
    }

    register(
        request: RegisterRequest,
    ): Observable<ResponseAPI> {
        return this.msAcceso.send<
            ResponseAPI,
            RegisterRequest
        >(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.REGISTER,
            request
        );
    }

    verify(
        request: UserConfirmationRequest,
    ): Observable<ResponseAPI> {
        return this.msAcceso.send<
            ResponseAPI,
            UserConfirmationRequest
        >(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.VERIFY,
            request
        );
    }

    sendVerification(
        request: PublicKeyRequest,
    ): Observable<ResponseAPI> {
        return this.msAcceso.send<
            ResponseAPI,
            PublicKeyRequest
        >(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.SEND_VERIFICATION,
            request
        );
    }

    async login(
        ip: string,
        userAgent: string,
        request: LoginRequest,
        response: Response,
    ): Promise<ResponseAPI<Pick<LoginResponse, 'usuario'>>> {
        request.ip = ip;
        request.userAgent = userAgent;

        const msResponse = await firstValueFrom(
            this.msAcceso.send<
                ResponseAPI<LoginResponse>,
                LoginRequest
            >(
                MICROSERVICES.ACCESO.ENDPOINTS.AUTH.LOGIN,
                request
            )
        );

        this.setCookies(msResponse.data.tokens, response);

        return {
            message: msResponse.message,
            data: {
                usuario: msResponse.data.usuario,
            }
        }
    }

    private setCookies(
        tokens: Tokens,
        response: Response,
    ): void {
        const expireAccess = new Date();
        expireAccess.setSeconds(
            expireAccess.getSeconds() + tokens.accessTokenTimeSeconds
        );

        response.cookie(
            ACCESS_TOKEN_KEY,
            tokens.accessToken,
            {
                httpOnly: true,
                secure: process.env.COOKIE_USE_SECURE === 'true',
                expires: expireAccess,
            }
        );

        const expireRefresh = new Date();
        expireRefresh.setSeconds(
            expireRefresh.getSeconds() + tokens.refreshTokenTimeSeconds
        );
        response.cookie(
            REFRESH_TOKEN_KEY,
            tokens.refreshToken,
            {
                httpOnly: true,
                secure: process.env.COOKIE_USE_SECURE === 'true',
                expires: expireRefresh,
            }
        );
    }

    async logout(
        response: Response,
        usuario: UsuarioInfo,
        refresh: RefreshInfo,
        ip: string
    ): Promise<ResponseAPI> {
        response.clearCookie(ACCESS_TOKEN_KEY);
        response.clearCookie(REFRESH_TOKEN_KEY);

        if (usuario && refresh) {
            // await firstValueFrom(
            //     this.msAcceso.emit<ResponseAPI, LogoutEvent>(
            //         'ms_sca.auth.logout',
            //         new LogoutEvent({
            //             codigo: refresh.codigo,
            //             idUsuarioSistema: usuario.usuarioSistemaId,
            //             ip,
            //         })
            //     )
            // );
        }

        return { message: 'Sesión cerrada' };
    }

    async refresh(
        ip: string,
        refresh: RefreshInfo,
        response: Response
      ): Promise<ResponseAPI<Pick<LoginResponse, 'usuario'>>> {
        // request.ip = ip;
        // request.userAgent = userAgent;

        const msResponse = await firstValueFrom(
            this.msAcceso.send<
                ResponseAPI<LoginResponse>,
                LoginRequest
            >(
                MICROSERVICES.ACCESO.ENDPOINTS.AUTH.LOGIN,
                {} as any
            )
        );

        this.setCookies(msResponse.data.tokens, response);

        return {
            message: msResponse.message,
            data: {
                usuario: msResponse.data.usuario,
            }
        }
      }

}
