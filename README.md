# Node + Express + TypeScript
  
# Descripción de la API

1. Nombre: task-api

2. Descripción: 
Este repositorio contiene el el backend de gestión de tareas, autenticación y registro de usuarios. Está construido bajo los principios de la Arquitectura Hexagonal, garantizando un desacoplamiento total entre la lógica de negocio y los servicios externos.

# Funcionalidades

1. Autenticación y gestión de usuarios  
    Endpoints para la gestión y validación de usuarios.

    **Ejemplos de endpoints:**
    - POST `api/user` # Registro de usuario  
    - POST `api/auth/login` # Inicio de sesión  
    - POST `auth/logout` # Cierre de sesión  

    La identidad del usuario se maneja mediante headers personalizados:
    - 'x-user-email'
    - 'x-user-id'

2. Gestión de tareas  
    Endpoints para la gestión de tareas.

    **Ejemplos de endpoints:**
    - POST `api/tasks` # Crear una nueva tarea y asociarla aun usuario 
    - GET `api/tasks` Listar tareas del usuario autenticado  
    - PATCH `api/tasks` # Actualiza la información de una tarea existente  
    - PATCH `api/tasks/:taskId/complete` # Actualiza el estado de una tarea a Completada
    - PATCH `api/tasks/:taskId/cancel`  
        Cambia el estado de la tarea a *Cancelada*, implementando un borrado lógico (soft delete) que evita la eliminación física del registro en la base de datos.

3. Validación de datos  
    Se implementan validaciones de entrada para garantizar la integridad de la información antes de procesarla.

    **Ejemplos de validaciones:**
    - Campos obligatorios (título de la tarea, email, contraseña).
    - Tipos de datos correctos (strings, identificadores numéricos).
    - Restricciones de longitud y formato.
    - Prevención de operaciones inválidas (editar tareas completadas).

Las validaciones se aplican en la capa de aplicación antes de ejecutar la lógica de negocio.

4. Arquitectura desacoplada  
    El backend está construido bajo los principios de la **Arquitectura Hexagonal**, asegurando:
    - Separación clara entre dominio, aplicación e infraestructura.
    - Independencia de frameworks y bases de datos.
    - Mayor facilidad para pruebas, mantenimiento y escalabilidad.

# Arquitectura del Proyecto
- El proyecto está estructurado siguiendo los principios de la **Arquitectura Hexagonal (Ports & Adapters)**, donde la lógica de negocio se mantiene completamente aislada de los detalles de infraestructura y frameworks externos.

- Principios aplicados
- Separación clara de responsabilidades.
- Desacoplamiento entre lógica de negocio y detalles de infraestructura.
- Facilidad para pruebas, mantenimiento y crecimiento del sistema.

- Estructura de Directorios

    ```bash
    src/
    ├── shared/                 # Recursos compartidos a nivel global
    │   ├── constants/          # Constantes del sistema
    │   ├── infrastructure/    	# Configuración e implementaciones comunes
    │   ├── middlewares/        # Middlewares globales
    │   └── responses/          # Respuestas HTTP estandarizadas
    │
    ├── tasks/                  # Feature: Gestión de tareas
    │   ├── adapters/
    │   │   └── web/            # Adaptadores HTTP (controllers y routes)
    │   ├── controllers/        # Controladores de entrada
    │   ├── routes/             # Definición de rutas
    │   ├── schemas/            # Validaciones y esquemas de datos
    │   ├── application/        # Casos de uso / lógica de aplicación
    │   ├── domain/             # Entidades y reglas de negocio
    │   └── infrastructure/     # Persistencia de la información
    │
    ├── users/                  # Feature: Usuarios y autenticación
    │   ├── adapters/
    │   │   └── web/	    # Adaptadores HTTP (controllers y routes)
    │   ├── controllers/	    # Controladores de entrada
    │   ├── routes/             # Definición de rutas
    │   ├── schemas/            # Validaciones y esquemas de datos
    │   ├── application/        # Casos de uso / lógica de aplicación
    │   ├── domain/             # Entidades y reglas de negocio
    │   └── infrastructure/     # Persistencia de la información
    │
    └── main.ts                 # Punto de entrada de la aplicación

- ¿Por qué se decidió usar esta arquitectura?
- Escalabilidad
    Permite agregar nuevas funcionalidades sin afectar módulos existentes, facilitando el crecimiento del API.

- Mantenibilidad
    Al estar el código modularizado, es más fácil de entender, modificar y depurar.

- Separación de responsabilidades
    Cada módulo es responsable de su propio dominio, reduciendo el acoplamiento entre distintas partes de la aplicación.

- Mejor experiencia para el desarrollador
    Facilita la compresión y entendimiento del proyecto de forma más rapida para los desarrolladores.

- Facilidad de testear
    Facilita mejor la forma de hacer pruebas y debug

# Seguridad y control de acceso
  El acceso a los recursos está protegido mediante un flujo de identidad basado en memoria y validación de cabeceras:

- Validación de resión: Se utiliza un Set en memoria para gestionar los usuarios con sesión activa.

- Protección de rutas: Middleware especializado que exige y valida las cabeceras:

        x-user-email: Email del usuario autenticado.

        x-user-id: Identificador único del usuario.

- CORS: Middleware configurado para restringir el acceso únicamente a orígenes autorizados.

- Rate Limiting: Implementación de un limitador de peticiones para prevenir el abuso de los endpoints.

    Configuración: Máximo de 100 peticiones cada 5 minutos.

    Objetivo: Mitigar ataques de fuerza bruta y asegurar que los recursos de Firestore se utilicen de manera eficiente, evitando costos inesperados o denegación de servicio.


# Decisiones Técnicas y Por Qué

- Arquitectura Hexagonal (Ports & Adapters)
Se adoptó la Arquitectura Hexagonal para aislar la lógica de negocio de los detalles de infraestructura, facilitando el mantenimiento, las pruebas y la evolución la API.

- Modular
Las funcionalidades se agrupan por dominios (tasks, users, etc.), permitiendo que cada módulo tenga unicamente una sola responsabilida.

- Soft Delete para Cancelación de Tareas
Las tareas canceladas no se eliminan físicamente de la base de datos. En su lugar, se aplica un **borrado lógico (soft delete)** para preservar la trazabilidad y consistencia de la información.

- Uso de Headers para Identidad de Usuario
La identificación del usuario se maneja mediante headers personalizados (`x-user-id`, `x-user-email`).

- API RESTful
Se diseñó la API siguiendo principios REST, utilizando verbos HTTP adecuados y rutas semánticas para mejorar la claridad, el consumo y la escalabilidad del sistema


# Stack Tecnológico

- Lenguaje y Entorno
  **Node.js**: Entorno de ejecución del backend.
  **TypeScript**: Tipado estático para mayor robustez, mantenibilidad y escalabilidad del código.

- Framework y Servidor
  **Express 5**: Framework HTTP ligero para la construcción de la API REST.

- Validación y Utilidades
  **Joi**: Validación de datos de entrada para garantizar integridad y consistencia.
  **UUID**: Generación de identificadores únicos para entidades del dominio.

- Seguridad y Middleware
  **CORS**: Configuración de políticas de acceso entre dominios.
  **Express Rate Limit**: Mitigar ataques de fuerza bruta y asegurar que los recursos de Firestore se utilicen de manera eficiente, evitando costos inesperados o denegación de servicio

### Persistencia y Servicios Externos
- **Firebase Admin SDK**: Integración con servicios de Firebase para autenticación y/o persistencia.
- **Firebase Functions**: Soporte para ejecución en entornos serverless.

# Configuración del Proyecto
- Clonar el repositorio
    ```bash
        git clone https://github.com/mejia-jose/Task-Api.git

- Instalar dependencias
    ```bash
        npm install

- Variables de entorno
  Para que la API funcione correctamente (especialmente la conexión con Firestore), es necesario configurar un archivo .env en la raíz de la carpeta functions.
  **Nota**: El archivo .env está incluido en el .gitignore para evitar la exposición de credenciales sensibles en el repositorio.

  - Para facilitar la configuración, se ha incluido un archivo de ejemplo con la estructura necesaria.

        1. Localiza el archivo .env.example en la raíz del proyecto.

        2. Copia su contenido en un nuevo archivo llamado .env.

        3. Completa los valores con tus credenciales de Firebase Service Account.

- Ejecutar la aplicación
    ```bash
        npm run start:dev

# Scripts de Build y Optimización

Para garantizar que la API funcione correctamente en la nube, se utilizaron procesos de optimización durante la fase de construcción:

- Build Optimizado: Se utiliza el compilador de TypeScript para generar código JavaScript limpio y eficiente, compatible con el entorno de ejecución de Node.js 20 en Firebase.

- Minificación y Limpieza: Durante el proceso de empaquetado (firebase deploy), Firebase optimiza el código para reducir el tamaño del bundle, mejorando los tiempos de respuesta ante "Cold Starts".

- Gestión de Dependencias: El despliegue incluye únicamente las dependencias de producción, minimizando la superficie de ataque y el peso de la función.

# Proceso de Despliegue (Manual)
El flujo de entrega seguido fue:

- Transpilación: Conversión de código fuente (TS) a código de distribución (JS) mediante:
    ```bash
        npm run build.

- Validación Local: Pruebas de integración en entorno local para asegurar la estabilidad de las rutas.

- Despliegue Directo: Uso de Firebase CLI para la publicación de la función:
    ```bash
        firebase deploy --only functions

# Repositorio:

- Url:(https://github.com/mejia-jose/Task-Api)

# API Desplegada

- La API fue desplegada en **Firebase Cloud Functions**, aprovechando su integración nativa y facilidad de despliegue.

- Url:(https://us-central1-api-task-e844a.cloudfunctions.net/api)
