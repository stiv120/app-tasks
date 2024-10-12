# Sistema de Gestión de Tareas

## Descripción del Proyecto

Este proyecto es un sistema básico de gestión de tareas desarrollado con Laravel y Vue.js. El sistema permite a los usuarios crear, actualizar, eliminar y visualizar tareas.

## Instrucciones de Instalación

Sigue los siguientes pasos para configurar el proyecto en tu entorno local:

1.  **Clona el repositorio:**

    app-tasks

2.  **Instala las dependencias de PHP y Node.js:**

    .Composer: Para instalar las dependencias de PHP, ejecuta:

         composer install

    .NPM: Para instalar las dependencias de Node.js, ejecuta:

         npm install
         npm run dev

3.  **Configura el archivo de entorno .env:**

    .Copia el archivo .env.example a .env:

        cp .env.example .env

    .Genera la clave de la aplicación:

        php artisan key:generate

    .Configura la base de datos en el archivo .env. Asegúrate de tener una base de datos MySQL disponible y configurada.

4.  **Ejecuta las migraciones para crear las tablas necesarias:**

    php artisan migrate

5.  **Compilar Recursos de Frontend:**

    .Compila los archivos de frontend utilizando Laravel Mix:

        npm run dev

6.  **Iniciar el Servidor:**

    .Inicia el servidor de desarrollo de Laravel:

        php artisan serve
