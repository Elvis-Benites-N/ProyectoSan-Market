import { UserAgent } from '@/common/decorators/user-agent.decorator';
import { ValidadorUtil } from '@Utils';
import { MICROSERVICES } from '@Constants';
import { ResponseAPI } from '@Interfaces';
import { Body, Controller, HttpCode, HttpStatus, Inject, OnModuleDestroy, OnModuleInit, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, RefreshInfo, UsuarioInfo } from './dto/login.dto';
import { PublicKeyRequest, PublicKeyResponse } from './dto/public-key.dto';
import { RegisterRequest } from './dto/register.dto';
import { UserConfirmationRequest } from './dto/user-confirmation.dto';
import { Response } from 'express';
import { OptionalJwtAuthGuard } from './jwt/access-token-jwt/optional-access.guard';
import { OptionalJwtRefreshGuard } from './jwt/refresh-token-jwt/optional-refresh.guard';
import { Usuario } from './jwt/access-token-jwt/auth.decorator';
import { Refresh } from './jwt/refresh-token-jwt/refresh.decorator';
import { JwtRefreshGuard } from './jwt/refresh-token-jwt/refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements OnModuleInit, OnModuleDestroy {

    constructor(
        @Inject(MICROSERVICES.ACCESO.NAME)
        private readonly msAcceso: ClientKafka,
        private readonly service: AuthService,
    ) { }

    onModuleInit() {
        this.msAcceso.subscribeToResponseOf(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.PUBLIC_KEY
        );
        this.msAcceso.subscribeToResponseOf(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.REGISTER
        );
        this.msAcceso.subscribeToResponseOf(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.LOGIN
        );
        this.msAcceso.subscribeToResponseOf(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.SEND_VERIFICATION
        );
        this.msAcceso.subscribeToResponseOf(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.VERIFY
        );
        this.msAcceso.subscribeToResponseOf(
            MICROSERVICES.ACCESO.ENDPOINTS.AUTH.LOGIN
        );
    }

    async onModuleDestroy() {
        await this.msAcceso.close();
    }

    @Post('public-key')
    @HttpCode(HttpStatus.OK)
    publicKey(
        @Body()
        request: PublicKeyRequest,
    ): Observable<PublicKeyResponse> {
        return this.service.publicKey(request);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(
        @Body()
        body: RegisterRequest,
    ): Observable<ResponseAPI> {
        return this.service.register(body);
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    verify(
        @Body()
        request: UserConfirmationRequest,
    ): Observable<ResponseAPI> {
        return this.service.verify(request);
    }

    @Post('send-verification')
    @HttpCode(HttpStatus.OK)
    sendVerification(
        @Body()
        request: PublicKeyRequest,
    ): Observable<ResponseAPI> {
        return this.service.sendVerification(request);
    }

    @Post('login')
    login(
        @RealIP()
        ip: string,
        @UserAgent()
        userAgent: string,
        @Body()
        request: LoginRequest,
        @Res({ passthrough: true })
        response: Response,
    ): Promise<ResponseAPI<Pick<LoginResponse, 'usuario'>>> {
        return this.service.login(
            ValidadorUtil.getSafeIP(ip),
            userAgent,
            request,
            response,
        );
    }

    @UseGuards(OptionalJwtAuthGuard, OptionalJwtRefreshGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(
        @Usuario()
        usuario: UsuarioInfo,
        @Refresh()
        refresh: RefreshInfo,
        @Res({ passthrough: true })
        response: Response,
        @RealIP()
        ip: string
    ): Promise<ResponseAPI> {
        return this.service.logout(
            response,
            usuario,
            refresh,
            ValidadorUtil.getSafeIP(ip)
        );
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(
        @RealIP()
        ip: string,
        @Refresh()
        refresh: RefreshInfo,
        @Res({ passthrough: true })
        response: Response
    ): Promise<ResponseAPI<Pick<LoginResponse, 'usuario'>>> {
        throw new UnauthorizedException({
            message: 'Unauthorized'
        });
        // return this.service.refresh(ValidadorUtil.getSafeIP(ip), refresh, response);
    }

}
