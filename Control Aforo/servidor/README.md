# Servidor para el proyecto de control de aforo

Este servidor está hecho en [nodeJS](https://nodejs.org/es/) con el framework [express.js](https://expressjs.com/es/).

## Instalación de dependencias
Lo primero que deberemos hacer es instalar Node en nuestro sistema. Después, para instalar las dependencias entraremos a la carpeta del servidor y ejecutaremos:

```bash
cd servidor
npm i
```
En caso de querer instalar también las dependencias para el testing, ejecutaremos:

```bash
npm install --dev
```
## Variables de entorno
Para poder ejecutar el servidor, deberemos configurar las variables de entorno. Para ello, deberemos crear un archivo `.env` en la carpeta del servidor. Una vez creado, deberemos configurar las variables de entorno siguientes:
```bash	
DATABASE_IP=ip
MQTT_IP=ip
```
Siendo `DATABASE_IP` la IP del servidor de base de datos y `MQTT_IP` la IP del servidor MQTT.

## Puesta en marcha
Para iniciar el proyecto ejecutamos:

```bash
node server.js
```
Una vez iniciado el servidor correrá en el puerto 5000 de nuestro equipo.
Para comprobarlo podemos ir al [navegador](http://localhost:5000) y deberemos ver un hello world.
Ahora podremos hacer llamadas a la api usando [Postman](https://www.postman.com)

Si queremos inicializar los tests, deberemos ejecutar:

```bash
npm run test
```
