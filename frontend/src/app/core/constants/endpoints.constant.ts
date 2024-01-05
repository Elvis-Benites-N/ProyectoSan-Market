export const ENDPOINTS = Object.freeze({
  catalogo: {
    items: {
      todos: 'catalogo/items',
    },
  },
  carrito: {
    obtener: 'carrito',
    eliminar: 'carrito/$1',
  },
  pagos: {
    obtener: 'pagos',
    porId: 'pagos/$1',
  },
  maestros: {
    tiposDeDocumento: 'maestros/tipos-de-documento',
    facultadesYDependencias: 'maestros/facultades-y-dependencias',
  },
  personas: {
    busqueda: 'personas/buscar',
    sunat: 'personas/sunat',
  },
  deudas: {
    todos: 'deudas',
    maestros: 'deudas-maestros',
    detalle: 'deudas/detalle/$1'
  }
});
