
interface EliminarItemEventNamed {
    readonly idUsuario: number;
    readonly idItemCarrito: number;
}

export class EliminarItemEvent {
    constructor(private readonly data: EliminarItemEventNamed) { }

    toString(): string {
        return JSON.stringify(this.data);
    }
}
