
export const GlobalSettings = Object.freeze({

    BASE_API_URL: 'http://localhost:8080',
    //BASE_API_URL: 'https://back-dot-pe-pacasmayo-siscred-gcp-dev.uc.r.appspot.com',
    N_COLUMNAS_GRID: 4,

/*     clientId: "3723124560-9b6f7hotqq80p7cean40228i8ea7j335.apps.googleusercontent.com",
    CLIENT_ID: 'PFryqr66AXV7uv0bNnsvx3KW',
    CLIENT_KEY: '3723124560-9b6f7hotqq80p7cean40228i8ea7j335.apps.googleusercontent.com',
 */
    clientId: "311178255527-hh0kq3ccrf68j5kusbeprulhmou3v3mt.apps.googleusercontent.com",
    CLIENT_ID:'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',
    CLIENT_KEY: '311178255527-hh0kq3ccrf68j5kusbeprulhmou3v3mt.apps.googleusercontent.com',

    //Perfiles
    PERFIL_ADMINISTRADOR: 1,
    PERFIL_USUARIO: 2,

    //Roles
    ROL_SOLICITANTE: 10,
    ROL_REVISOR: 20,
    ROL_RPA: 30,
    ROL_EVALUADOR: 40,
    ROL_APROBADOR: 50,
    
    ROL_COSTOS: 4,
    ROL_COMERCIAL: 5,
    ROL_ADMINISTRADOR_MATERIAL: 6,
    ROL_SAP: 7,
    ROL_MARKETING: 10,

    //Estados
    ESTADO_SOLICITUD_EN_SOLICITANTE: 10,
    ESTADO_SOLICITUD_EN_REVISION: 20,
    ESTADO_SOLICITUD_EN_RPA: 30,
    ESTADO_SOLICITUD_EN_EVALUACION: 40,
    ESTADO_SOLICITUD_EN_APROBACION: 50,

    ESTADO_SOLICITUD_ANULADO: 2,
    ESTADO_SOLICITUD_EN_ADMINISTRACION: 7,
    ESTADO_SOLICITUD_EN_CONTROL_GESTION: 10,
    ESTADO_SOLICITUD_EN_SAP: 8,
    ESTADO_SOLICITUD_FINALIZADO: 9,
    ESTADO_SOLICITUD_EN_MARKETING: 11,
    ESTADO_SOLICITUD_EN_APROBACION_FINAL: 12,
    ESTADO_SOLICITUD_FINALIZADO_FACTURACION: 13,

    //tipos de objeto
    TIPO_OBJETO_INPUT_TEXT: 'input-text',
    TIPO_OBJETO_INPUT_TEXTAREA: 'input-textarea',
    TIPO_OBJETO_COMBO: 'combo',
    TIPO_OBJETO_CHECKBOX: 'checkbox',
    TIPO_OBJETO_INPUT_TEXT_AUTOCOMPLETE: 'input-text-autocomplete',

    //tipos de dato
    TIPO_DATO_NUM: 'NUM',
    TIPO_DATO_CHAR: 'CHAR',

    //Códigos internos de reglas de campos
    CODIGO_INTERNO_MATERIAL_CODIGO_SAP: 'material_codigo_sap',
    CODIGO_INTERNO_DENOMINACION: 'denominacion',
    CODIGO_INTERNO_UNIDAD_MEDIDA_BASE: 'unidad_medida_base',
    CODIGO_INTERNO_PESO_BRUTO: 'peso_bruto',
    CODIGO_INTERNO_UNIDAD_MEDIDAD_PESO: 'unidad_medida_peso',
    CODIGO_INTERNO_CENTRO: 'centro_codigo_sap',
    CODIGO_INTERNO_CENTRO_BENEFICIO: 'centro_beneficio_codigo_sap',
    CODIGO_INTERNO_ORGANIZACION_VENTAS: 'organizacion_ventas',
    CODIGO_INTERNO_CANAL_DISTRIBUCION: 'canal_distribucion',
    CODIGO_INTERNO_ALMACEN: 'almacen_codigo_sap',
    CODIGO_INTERNO_CLASE_TAB: 'clasificacion_tab',
    //calidad
    CODIGO_INTERNO_ALMACEN_PRODUCCION: 'almacen_produccion',
    CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION: 'responsable_control_produccion',
    CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION: 'perfil_control_fabricacion',
    //Costos
    CODIGO_INTERNO_CATEGORIA_VALORACION: 'categoria_valoracion',
    //Comercial
    CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA: 'unidad_medida_venta',
    CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT: 'grupo_estadistica_mat',
    CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL: 'grupo_imputacion_material',
    CODIGO_INTERNO_JERARQUIA_PRODUCTO: 'jerarquia_producto',
    CODIGO_INTERNO_GRUPOS_MATERIAL1: 'grupos_material1',
    CODIGO_INTERNO_GRUPOS_MATERIAL2: 'grupos_material2',
    CODIGO_INTERNO_TEXTO_COMERCIAL: 'texto_comercial',
    //Administrador materiales
    CODIGO_INTERNO_GRUPO_TRANSPORTE: 'grupo_transporte',
    CODIGO_INTERNO_GRUPO_CARGA: 'grupo_carga',
    CODIGO_INTERNO_IDIOMA: 'idioma',
    CODIGO_INTERNO_TEXTO_COMPRA: 'texto_compra',
    CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO: 'unidad_medida_pedido',
    CODIGO_INTERNO_UMP_VAR: 'ump_var',
    //Control de gestión
    CODIGO_INTERNO_PRECIO_ESTANDAR: 'precio_estandar',

    CODIGO_INTERNO_CODIGO_EAN: 'codigo_ean',
    CODIGO_INTERNO_GRUPO_TIPO_POSICION: 'grupo_tipo_posicion',
    CODIGO_INTERNO_PARTIDA_ARANCELARIA: 'partida_arancelaria',
    CODIGO_INTERNO_PRECIO_VARIABLE: 'precio_variable',
    CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD: 'verificacion_disponibilidad',

    CODIGO_INTERNO_TIPO_MATERIAL: 'tipo_material',
    CODIGO_INTERNO_GRUPO_ARTICULO: 'grupo_articulo',
    CODIGO_INTERNO_SECTOR: 'sector',

    CODIGO_INTERNO_FORMULA_CONCRETO: 'formula_concreto',

    CODIGO_INTERNO_RAMO: 'ramo',
    CODIGO_INTERNO_AMPLIACION: 'ampliacion',

    CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO: 'limite_exceso_sum_ilimitado',
    CODIGO_INTERNO_PRECIO_BASE: 'precio_base',
    CODIGO_INTERNO_MONEDA: 'moneda',
    CODIGO_INTERNO_IND_PED_AUTOMA: 'ind_ped_automa',
    CODIGO_INTERNO_EXCESO_SUM_ILIMITADO: 'exceso_sum_ilimitado',

    CODIGO_INTERNO_CLASE_INSPECCION_TAB: 'clase_inspeccion_tab',
    CODIGO_INTERNO_MATERIAL_CODIGO_MODELO: 'material_codigo_modelo',

    CODIGO_INTERNO_CRITICOS: 'criticos',
    CODIGO_INTERNO_ESTRATEGICOS: 'estrategicos',

    CODIGO_INTERNO_GRUPO_COMPRA: 'grupo_compra',
    CODIGO_INTERNO_AREA_PLANIFICACION_TAB: 'area_planificacion_tab',

    CODIGO_INTERNO_VISTA_PLANIFICACION: 'vista_planificacion',
    CODIGO_INTERNO_PRECIO_COTIZACION: 'precio_cotizacion',
    CODIGO_INTERNO_PERIODO_VIDA: 'periodo_vida',
    CODIGO_INTERNO_MOTIVO: 'motivo',
    CODIGO_INTERNO_PETICION_BORRADO: 'peticion_borrado',

    //ESCENARIO NIVEL 1 

    ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS: '1000',
    ESCENARIO_NIVEL1_REPUESTOS_SUMINISTROS: '2000',
    ESCENARIO_NIVEL1_MATERIAS_PRIMAS: '3000',
    ESCENARIO_NIVEL1_ACTIVOS_OTROS: '4000',

    // VISTA PORTAL

    VISTA_PORTAL_BASICO: 1,

    //TIPO DE SOLICITUD
    TIPO_SOLICITUD_CREACION: 1,
    TIPO_SOLICITUD_AMPLIACION: 2,
    TIPO_SOLICITUD_MODIFICACION: 3,
    TIPO_SOLICITUD_BLOQUEO: 4,

    TIPO_SOLICITUD_CREACION_CHAR: 'C',
    TIPO_SOLICITUD_AMPLIACION_CHAR: 'A',
    TIPO_SOLICITUD_MODIFICACION_CHAR: 'M',
    TIPO_SOLICITUD_BLOQUEO_CHAR: 'B',


    //para consulta de solicutdes
    SOLICITUD_DETALLE_NUMERO_COLUMNAS: 6,
    PAGINA_INICIO: 1,
    CANTIDAD_FILAS: 15,
    CANTIDAD_FILAS_MATERIALES: 100,

    //Mensajes material solicitud
    MENSAJE_GUARDAR_SOLICITUD: "Se guardó la solicitud correctamente! ",
    MENSAJE_ACTUALIZAR_SOLICITUD: 'Se actualizó la solicitud correctamente! ',
    MENSAJE_AGREGAR_MATERIAL: "Se agregó el material correctamente! ",
    MENSAJE_ELIMINAR_MATERIAL: "Se eliminó el material correctamente! ",
    MENSAJE_ACTUALIZAR_MATERIAL: "Se actualizó el material correctamente.",
    MENSAJE_CARGA_MASIVA: "Se cargaron los materiales correctamente! ",
    MENSAJE_ENVIO_SOLICITUD: "Se envió la solicitud correctamente! ",
    MENSAJE_ANULAR_SOLICITUD: "Se anuló la solicitud correctamente!",

    MENSAJE_CARGAR_ANEXO_SOLICITUD: "Se cargó el anexo de la solicitud correctamente!",
    MENSAJE_CARGAR_ANEXO_MATERIAL: "Se cargó el anexo del material correctamente!",
    MENSAJE_ELIMINAR_ANEXO_SOLICITUD: "Se eliminó el anexo de la solicitud correctamente!",
    MENSAJE_ELIMINAR_ANEXO_MATERIAL: "Se eliminó el anexo del material correctamente!",

    LISTADO_MONEDA: [{ codigo_sap: "PEN", nombre: "Soles" }, { codigo_sap: "USD", nombre: "Dolar" }],

    CAMPOS_TAB: ['clasificacion_tab', 'clase_inspeccion_tab'],

    LISTADO_UMP_VAR: [{ codigo_sap: '', nombre: 'No Activo' }, { codigo_sap: '1', nombre: 'Activo' }, { codigo_sap: '2', nombre: 'Activo con Precio propio' }],

    //Motivos
    MOTIVO_RECHAZAR_SOLICITUD: 1,
    MOTIVO_ANULAR_SOLICITUD: 2,
    MOTIVO_ANULAR_MATERIAL: 3,

    //Idioma
    VALOR_DEFECTO_IDIOMA:"ES",
})