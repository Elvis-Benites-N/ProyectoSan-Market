export interface PublicKeyRequest {
    readonly email: string;
}

export interface PublicKeyResponse{
    readonly secretKey: string;
}