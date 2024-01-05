export const MICROSERVICES = Object.freeze({
  ACCESO: {
    NAME: 'MS_ACCESO',
    ENDPOINTS: {
      AUTH: {
        PUBLIC_KEY: 'ms_acc_san_mar.public_key',
        LOGIN: 'ms_acc_san_mar.login',
        REGISTER: 'ms_acc_san_mar.register',
        VERIFY: 'ms_acc_san_mar.verify',
        SEND_VERIFICATION: 'ms_acc_san_mar.send_verification',
        REFRESH: 'ms_acc_san_mar.refresh',
        LOGOUT: 'ms_acc_san_mar.logout',
        LISTAR_PERFILES: 'ms_acc_san_mar.listar_perfiles',
        CREAR_PERFILES: 'ms_acc_san_mar.crear_perfil',
      },
    },
  },
  CATALOGO: {
    NAME: 'MS_CATALOGO',
    ENDPOINTS: {
      ITEMS: {
        CONSULTA: {
          ITEMS: 'ms_cat.items.consulta',
          POR_ID: 'ms_cat.items.consulta.por_id',
        },
      },

      MAESTROS: {
        CONSULTA: 'ms_cat.maestros.consulta',
      },
      HEALTH: 'ms_cat.health',
      LIMPIEZA: {
        CONSULTAR_ITEMS: 'ms_cat.limpieza.consultar_items',
        ENVIAR_ITEMS: 'ms_cat.limpieza.enviar_items',
      },
      GRUPOS: {
        CONSULTA: {
          CONSULTA_GRUPOS: 'ms_cat.get_grupos',
          CONSULTA_GRUPO_POR_ID: 'ms_cat.get_grupo_por_id',
        },
        MANTENIMIENTO: {
          AGRUPAR_ITEMS: 'ms_cat.agrupar_items',
        },
      },

      DESTACADOS: {
        CONSULTA: {
          CONSULTA_ITEMS_DESTACADOS: 'ms_cat.get_items_destacados',
          CONSULTA_GRUPOS_DESTACADOS: 'ms_cat.get_grupos_destacados',
        },
        MANTENIMIENTO: {
          DESTACAR_ITEMS: 'ms_cat.destacar_items',
        },
      },
    },
  },
  CARRITO: {
    NAME: 'CARRITO_SERVICE',
    ENDPOINTS: {
      MANTENIMIENTO: {
        AGREGAR: 'ms_car.agregar_item_carrito',
        ACTUALIZAR: 'ms_car.actualizar_item_carrito',
        ELIMINAR: 'ms_car.eliminar_item_carrito',
      },
      CONSULTA: {
        OBTENER: 'ms_car.get_carrito',
      },
    },
  },

  PERSONAS: {
    NAME: 'PERSONAS_SERVICE',
    ENDPOINTS: {
      MANTENIMIENTO: {
        REGISTAR_PERSONA: 'ms_per.registrar_persona',
        ACTUALIZAR_PERSONA: 'ms_per.actualizar_persona',
      },
      CONSULTA: {
        CONSULTA_OBTENER_PERSONAS: 'ms_per.obtener_personas',
        CONSULTA_OBTENER_PERSONA: 'ms_per.obtener_persona',
        CONSULTA_OBTENER_PERSONA_POR_ID: 'ms_per.obtener_persona_por_id',
        CONSULTA_OBTENER_PERSONA_POR_EMAIL: 'ms_per.obtener_persona_por_email',
        CONSULTA_TIPO_DOCUMENTO: 'ms_per.get_tipos_de_documento',
      },
    },
  },
  DEPENDENCIAS: {
    NAME: 'DEPENDENCIAS_SERVICE',
    ENDPOINTS: {
      MAESTROS: {
        CONSULTA: 'get_dependencias_maestros',
      },
    },
  },

  DEUDAS: {
    NAME: 'DEUDAS_SERVICE',
    ENDPOINTS: {
      CONSULTA: {
        DEUDAS: 'ms_deu.obtener_deudas',
        DEUDAS_SAN_MARKET: 'ms_deu.obtener_deudas_san_market',
        DETALLE: 'ms_deu.detalle_deuda',
      },
      MAESTROS: 'ms_deu.maestros',
    },
  },

  PAGOS: {
    NAME: 'PAGOS_SERVICE',
    ENDPOINTS: {
      PAGOS_CLIENTE: {
        CONSULTA: {
          OBTENER_POR_ID: 'ms_pag.obtener_pago_por_id',
          OBTENER_PAGOS: 'ms_pag.obtener_pagos',
          OBTENER_PAGOS_POR_UNIDEP: 'ms_pag.get_payments_by_unidep',
        },
        MANETENIMIENTO: {
          CREAR_PAGO: 'ms_pag.crear_pago',
          ACTUALIZAR_PAGO: 'ms_pag.actualizar_pago',
          EXTORNAR_PAGO: 'ms_pag.extornar_pago',
        },
      },
      BCP: {
        PAGO: 'ms_pag.realizar_pago_bcp',
        INQUIRE: 'ms_pag.bcp.inquire',
        PAYMENT: 'ms_pag.bcp.payment',
      },
      MANUAL: {
        MANTENIMIENTO: {
          CREAR: 'ms_pag.manual.mantenimiento.crear',
          APROBAR: 'ms_pag.manual.mantenimiento.aprobar',
          REPROBAR: 'ms_pag.manual.mantenimiento.reprobar',
        },
      },
    },
  },
});
