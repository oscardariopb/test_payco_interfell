# Ejecutar en desarrollo

1. Clonar el repositorio
2. Usar la versión de node requerida.

```
nvm install 20.18.0
```

3. Instalar dependencias en cada proyecto

```
cd soap_app
npm install

cd rest_bridge
npm install
```

4. Clonar el archivo **.env.template** y renonmbrar la copia a `.env`

5. LLenar las variables de entorno definidas en `.env`

6. Ejercutar la app en dev

```
npm start
```

7. Hacer peticiones

Usar preferiblemente postman e importar el archivo con las rutas, se anexan tanto para el servicio soap como el servicio rest.

## stack usado

- MongoDB
- Node.js
- Express
- Soap
