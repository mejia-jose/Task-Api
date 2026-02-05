export const UserMessages =
{
  SUCCESS:{
    LOGIN: 'Usuario autenticado correctamente.',
    USER_CREATED: "Usuario creado correctamente."
  },
  
  ERROR:{
    REQUIRED_EMAIL: "El correo electrónico es un campo obligatorio",
    INVALID_EMAIL: "El formato del correo electrónico no es válido",
    EMPTY_EMAIL: "El correo electrónico no puede estar vacío",
    USER_NOT_FOUND: ' El usuario no se encuentra registrado.',
    ERROR_GENERAL: 'Validación fallida: por favor,revisa los campos requeridos.',
  }
}

export const TaskMessages = 
{
  SUCCESS: {
    TASK_CREATED: 'La tarea ha sido creada correctamente.',
    TASK_UPDATED: 'La tarea ha sido actualizada correctamente.',
    TASK_DELETED: 'La tarea ha sido eliminada correctamente.',
    TASK_CANCELLED: 'La tarea ha sido cancelada correctamente.',
    TASK_COMPLETED: 'La tarea ha sido marcada como completada.',
  },
  ERROR: {
    TASK_NOT_FOUND: 'La tarea no se encuentra registrada.',
    TASK_ALREADY_CANCELLED: 'La tarea ya se encuentra cancelada.',
    TASK_CANNOT_BE_UPDATED: 'Las tareas canceladas no pueden ser modificadas.',
    TASK_STATUS_NOT_CHANGE: 'Las tareas que se hayan eliminado previamente no podrán cambiar su estado', 
    INVALID_TITLE: "El título de la tarea no es válido.",
    REQUIRED_TITLE: "El título de la tarea es requerido.",
    TITLE_LENGTH: "El título debe tener al menos 3 caracteres",
    INVALID_DESCRIPTION: "La descripción no es válida",
    INVALID_USER_ID: "El ID del usuario no es válido",
    REQUIRED_USER_ID: "El ID del usuario es obligatorio",
    USERID_TYPE_UUID: "El userId debe ser un UUID válido",
  }
};