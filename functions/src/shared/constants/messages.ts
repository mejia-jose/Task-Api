export const UserMessages =
{
  SUCCESS:{
    LOGIN: 'Usuario autenticado correctamente.',
    USER_CREATED: "Usuario creado correctamente.",
    LOGOUT: "Sesión cerrada correctamente."
  },
  
  ERROR:{
    REQUIRED_EMAIL: "El correo electrónico es un campo obligatorio",
    INVALID_EMAIL: "El formato del correo electrónico no es válido",
    EMPTY_EMAIL: "El correo electrónico no puede estar vacío",
    USER_NOT_FOUND: 'El usuario ingresado no se encuentra registrado. Haz clic en Regístrate aquí y crea tu cuenta en pocos segundos.',
    USER_NOT_FOUND_ID: 'No se ha podido identificar el usuario, por favor cierra la sesión y vuelve a iniciarla.',
    ERROR_GENERAL: 'Validación fallida: por favor,revisa los campos requeridos.',
    UNAUTHORIZED: 'Acceso no autorizado: por favor debes iniciar sesión para continuar.',
    NAME_REQUIRED: 'El nombre del usuario es obligarorio.',
    NAME_LENGTH: "El nombre debe tener al menos 3 caracteres",
    ERROR_LOGOUT: "El usuario no se encuentra autenticado."
  }
}

export const TaskMessages = 
{
  SUCCESS: {
    TASK_CREATED: 'La tarea ha sido creada correctamente.',
    LIST_TASKS: 'Listado de tareas obtenido correctamente.',
    TASK_UPDATED: 'La tarea ha sido actualizada correctamente.',
    TASK_DELETED: 'La tarea ha sido eliminada correctamente.',
    TASK_CANCELLED: 'La tarea ha sido eliminada correctamente.',
    TASK_COMPLETED: 'La tarea ha sido marcada como completada.',
  },
  ERROR: {
    TASK_NOT_FOUND: 'La tarea no fue encontrada. Por favor, verifique que los datos proporcionados sean correctos e intente nuevamente.',
    TASK_ALREADY_CANCELLED: 'La tarea ya se encuentra cancelada.',
    TASK_ALREADY_COMPLETED: 'La tarea ya se encuentra completada.',
    TASK_CANNOT_BE_UPDATED: 'Las tareas canceladas no pueden ser modificadas.',
    TASK_STATUS_NOT_CHANGE: 'Las tareas que se hayan eliminado previamente no podrán cambiar su estado', 
    INVALID_TITLE: "El título de la tarea no es válido.",
    REQUIRED_TITLE: "El título de la tarea es requerido.",
    TITLE_LENGTH: "El título debe tener al menos 3 caracteres",
    INVALID_DESCRIPTION: "La descripción no es válida",
    INVALID_USER_ID: "El ID del usuario no es válido",
    REQUIRED_USER_ID: "El ID del usuario es obligatorio",
    USERID_TYPE_UUID: "El userId debe ser un UUID válido",
    REQUIRED_TASKS_ID: "El ID de la tarea es obligatorio",
    TASKS_TYPE_UUID: "El ID de la tarea debe ser un UUID válido",
  }
};

export const CorsError = {
  NOT_ALLOWED:
    'Acceso bloqueado por la política de CORS. El origen de la solicitud no está autorizado.'
};

export const EnvError = {
  ACCOUNT_SERVICES_UNDEFINED: 'La variable de entorno ACCOUNT_SERVICES no está definida. ' +
    'Coloca el nombre del archivo de la cuenta de servicio en el .env y asegúrate de que exista en functions/'
};