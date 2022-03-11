export const Messages = Object.freeze({

    confirmation: {

        //Aprobación Solicitud

        MENSAJE_APROBAR_SOLICITUD: "Se aprobó la solicitud correctamente!",
        MENSAJE_ENVIAR_SOLICITUD_A_SAP: "Se envió la solicitud correctamente a SAP",
        MENSAJE_RECHAZAR_SOLICITUD: "Se rechazó la solicitud correctamente!",
        MENSAJE_CREAR_CORREO_ESTRATEGIA: "Se agregó el correo para la estrategia correctamente!",
        MENSAJE_ELIMINAR_CORREO_ESTRATEGIA: "Se eliminó el correo de la estrategia correctamente!",
        MENSAJE_REGISTRAR_ESTRATEGIA: "se registro la estrategia correctamente!",
        MENSAJE_CREAR_EQUIVALENCIA: "Se creó la equivalencia requerida!",
        MENSAJE_QUITAR_EQUIVALENCIA: "Se eliminó la equivalencia!",
        MENSAJE_ASIGNAR_IDIOMA: "Se agregó el idioma al material!",
        MENSAJE_QUITAR_IDIOMA: "Se desasignó el idioma del material!",
    },
    error: {
        MENSAJE_ERROR_BLOQUEADO_ALMACEN: 'Petición de borrado fijado a nivel de almacén.',
        MENSAJE_ERROR_BLOQUEADO_CENTRO: 'Como mínimo se han fijado dos peticiones de borrado.',
        MENSAJE_ERROR_BLOQUEADO_CODIGO_MATERIAL: 'Petición de borrado fijada a nivel de mandante.',
        MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP: 'Material no existe en SAP',
        MENSAJE_ERROR_DENOMINACION_SAP: 'Material ya existe',
        MENSAJE_ERROR_DENOMINACION_BD: 'Material ya existe en tramite de solicitud',
        MENSAJE_ERROR_DENOMINACION_SIN_INGRESAR_BD: 'No se ha creado Denominación, no se puede Ampliar',
        MSG_ERROR_INVALID_CREDENTIALS: 'Email o contrase\u00F1a incorrectas.',
        MSG_ERROR_ACCESS_URL: "Se encontro un problema al intentar acceder al archivo solicitado.",
        MSG_ERROR_LINK_PASSWORD: "Se encontro un problema al intentar enviar email.",
        MSG_ERROR_SERVER: 'Se encontro un problema en el sistema, por favor intentenlo mas tarde..',
        MSG_ERROR_FINALIZAR_SOLICITUD: 'No se puede finalizar solicitud, existen materiales con código sap sin generar',
        MSG_ERROR_NO_ANEXO: "El material no tiene un anexo cargado",
        MSG_ERROR_AGREGAR_IDIOMA: "El idioma no pudo ser agregado al material",
        MSG_ERROR_QUITAR_IDIOMA: "El idioma no pudo ser quitado del material",
    },
    warnig: {
        //Usuarios
        MENSAJE_APROBAR_SOLICITUD: '\u00BFConfirma aprobar solicitud?',
        MENSAJE_ENVIAR_SOLICITUD: '\u00BFConfirma enviar solicitud a SAP?',
        MENSAJE_RECHAZAR_SOLICITUD: '\u00BFConfirma rechazar?',
        MENSAJE_EXISTE_ERRORES_AL_GRABAR_SOLICITUD: 'Datos sin llenar y/o con Errores en materiales.\n Verificar Campos.\n ',
        MENSAJE_FINALIZAR_SOLICITUD: '\u00BFConfirma finalizar Solicitud?',
        MENSAJE_DIALOGO_MOTIVO_RECHAZO: '¿Confirma el rechazo de la solicitud?',
        MENSAJE_DIALOGO_ELIMINAR_MATERIAL: 'Se eliminará el material seleccionado',
        MENSAJE_DIALOGO_ELIMINAR_MATERIAL_AMPLIADOS: 'Se eliminarán los materiales ampliados de este material',
        MENSAJE_ENVIAR_SOLICITUD_SUPERVISION: '\u00BFConfirma envio a Supervisión?',

    },
    search: {
        MSG_RESULTS_NOT_FOUND: 'No se encontro resultados.',
        MSG_RESULTS_MAX: 'Demasiados resultados de la búsqueda para mostrarse en pantalla, ver archivo XLS.',
    },
    info: {
        MSG_TODAYS_APPOINTMENTS_EMPTY: 'No se encuentran citas para el dia de hoy'
    },
    status: {
        //APPOINTMENT
        MSG_APPOINTMENT_STATUS_PLANNED: "La cita se encuentra en estado Planificado"
    }

});