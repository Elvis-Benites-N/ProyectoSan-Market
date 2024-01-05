import { Injectable } from "@angular/core";
import { TipoItemCarritoEnum } from "src/app/core/enums/tipoItemCarrito.enum";
import { CarritoResponse } from "../../services/business/dto/carrito/carrito.dto";
import { GrupoResponse } from "../../services/business/dto/catalogo/grupos/grupos.dto";
import { ItemCatalogo } from "../../services/business/dto/catalogo/items/catalogo.dto";

@Injectable({
    providedIn: 'root',
})
export class CarritoProvider {
    getCarrito(): CarritoResponse {
        // const carritoItem = this.cookieService.get(CARRITO);
        // if (!carritoItem || carritoItem.trim().length === 0)
        //     return this.defaultCarrito();

        // const carritoDecrypted = EncryptUtil.decryptBase64(
        //     carritoItem,
        //     environment.carritoKey
        // );

        // if (!carritoDecrypted || carritoDecrypted.trim().length === 0)
        return this.defaultCarrito();

        // return JSON.parse(carritoDecrypted);
    }

    agregarItemCarrito(
        carrito: CarritoResponse | undefined,
        id: number | undefined,
        data: ItemCatalogo | GrupoResponse,
        tipoItemCarrito: TipoItemCarritoEnum,
        guardar: boolean
    ): void {
        if (!carrito) return;

        if (!carrito.monedaId) {
            carrito.monedaId = data.monedaId;
            carrito.monedaSimbolo = data.monedaSimbolo;
        }

        const indexItemCarrito = this.encontrarIndexItemCarrito(
            carrito,
            id,
            data.id,
            tipoItemCarrito
        );
        const esNuevaInsercion = indexItemCarrito === -1;

        if (esNuevaInsercion) {
            carrito.itemsCarrito.unshift({
                id: id,
                itemCatalogo:
                    tipoItemCarrito === TipoItemCarritoEnum.Item
                        ? (data as ItemCatalogo)
                        : undefined,
                grupo:
                    tipoItemCarrito === TipoItemCarritoEnum.Grupo
                        ? (data as GrupoResponse)
                        : undefined,
                cantidad: 1,
                precioTotal:
                    tipoItemCarrito === TipoItemCarritoEnum.Item
                        ? (data as ItemCatalogo).itemPrecio * 1
                        : (data as GrupoResponse).precio * 1,
            });
            carrito.precioTotal +=
                tipoItemCarrito === TipoItemCarritoEnum.Item
                    ? (data as ItemCatalogo).itemPrecio * 1
                    : (data as GrupoResponse).precio * 1;
        } else {
            carrito.itemsCarrito[indexItemCarrito].cantidad++;
            carrito.itemsCarrito[indexItemCarrito].precioTotal +=
                tipoItemCarrito === TipoItemCarritoEnum.Item
                    ? (data as ItemCatalogo).itemPrecio * 1
                    : (data as GrupoResponse).precio * 1;
            carrito.precioTotal +=
                tipoItemCarrito === TipoItemCarritoEnum.Item
                    ? (data as ItemCatalogo).itemPrecio * 1
                    : (data as GrupoResponse).precio * 1;
        }

        if (esNuevaInsercion) {
            if (tipoItemCarrito === TipoItemCarritoEnum.Item) {
                carrito.cantidadItems++;
            } else {
                carrito.cantidadGrupos++;
            }
        }

        carrito.cantidadTotal++;

        if (guardar) this.guardarCarrito(carrito);
    }

    private encontrarIndexItemCarrito(
        carrito: CarritoResponse,
        id: number | undefined,
        idData: number,
        tipoItemCarrito: TipoItemCarritoEnum
    ): number {
        if (id === undefined) {
            if (tipoItemCarrito === TipoItemCarritoEnum.Item)
                return carrito.itemsCarrito.findIndex(
                    (e) => e.itemCatalogo && e.itemCatalogo.id === idData
                );

            return carrito.itemsCarrito.findIndex(
                (e) => e.grupo && e.grupo.id === idData
            );
        }

        return carrito.itemsCarrito.findIndex((e) => e.id === id);
    }

    private guardarCarrito(carrito: CarritoResponse): void {
        if (!carrito) return;

        // const carritoEncrypted = EncryptUtil.encryptBase64(
        //   JSON.stringify(carrito),
        //   environment.carritoKey
        // );
        // const expires = new Date();
        // expires.setHours(expires.getHours() + 1);

        // this.cookieService.set(CARRITO, carritoEncrypted, {
        //   expires: expires,
        // });
    }

    eliminarItemCarrito(
        carrito: CarritoResponse,
        id: number,
        idData: number,
        tipoItemCarrito: TipoItemCarritoEnum,
        guardar: boolean
    ): void {
        if (!carrito) return;

        const indexItemCarrito = this.encontrarIndexItemCarrito(
            carrito,
            id,
            idData,
            tipoItemCarrito
        );

        if (indexItemCarrito === -1) return;

        const itemCarrito = carrito.itemsCarrito[indexItemCarrito];
        carrito.precioTotal -= itemCarrito.precioTotal;
        carrito.itemsCarrito.splice(indexItemCarrito, 1);

        if (carrito.itemsCarrito.length === 0) {
            carrito.monedaId = undefined;
            carrito.monedaSimbolo = undefined;
        }

        this.actualizarCantidad(carrito);

        if (guardar) this.guardarCarrito(carrito);
    }

    private actualizarCantidad(carrito: CarritoResponse) {
        carrito.cantidadItems = carrito.itemsCarrito
            .filter((e) => e.itemCatalogo !== null && e.itemCatalogo !== undefined)
            .reduce<number>((acum, e) => {
                acum += e.cantidad;
                return acum;
            }, 0);
        carrito.cantidadGrupos = carrito.itemsCarrito
            .filter((e) => e.grupo !== null && e.grupo !== undefined)
            .reduce<number>((acum, e) => {
                acum += e.cantidad;
                return acum;
            }, 0);
        carrito.cantidadTotal = carrito.itemsCarrito.reduce<number>((acum, e) => {
            acum += e.cantidad;
            return acum;
        }, 0);
    }

    private defaultCarrito(): CarritoResponse {
        return {
            itemsCarrito: [],
            precioTotal: 0,
            cantidadItems: 0,
            cantidadGrupos: 0,
            cantidadCuotas: 0,
            cantidadTotal: 0,
        };
    }
}