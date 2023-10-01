
# c1-211105-hexagonal

# Repositorio c1-211105-hexagonal

Este proyecto utiliza una arquitectura hexagonal y se conecta a una base de datos MySQL.

## Instrucciones de Instalación

Sigue estos pasos para configurar y ejecutar el proyecto:

### **Paso 1:** Clonar el Repositorio

Primero, clona el repositorio en tu máquina local.

```bash
git clone hhttps://github.com/211105/c1-211105-hexagonal.git
``````
### **Paso 2:** Documentacion de postman
```bash
https://documenter.getpostman.com/view/19933973/2s9YJW6m5g
``````
### **Paso 3:** Configurar Variables de Entorno
Dirigirse a la carpeta src/database/mysql.ts
```
En este caso se uso la base de datos de MYSQL

host: process.env.DB_HOST || 'localhost',
user: process.env.DB_USER || <Usuario de manejador de base de datos>,
database: process.env.DB_DATABASE || <NombreDeLaBaseDeDatos>,
password: process.env.DB_PASSWORD || <TuContraseñaDB>,
waitForConnections: true,
connectionLimit: 10,


```

### **Paso 4:** Instalación de Dependencias y Ejecución

instala las dependencias necesarias:

```bash
npm install


npm run dev
>>>>>>> dev
