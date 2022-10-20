# Página web para el proyecto de control de aforo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instalación de dependencias
Después de instalar [Node](https://nodejs.org/es/)
Instalamos yarn de forma global. [Yarn](https://yarnpkg.com) es un package manager como npm, pero mantenido por facebook. Funcionará más rápido en este proyecto.
```bash
npm install -g yarn
```
Entramos a la carptea del proyecto y ejecutamos yarn install

```bash
cd aforo-web
yarn install
```

## Variables de entorno
Tendremos que crear un archivo `.env` en la carpeta del proyecto de la página web, en el directorio raiz.
Una vez creado, tendremos que agregar las siguientes variables de entorno:
```bash
REACT_APP_API_URL=http://ipservidor:3001
REACT_APP_MQTT_URL=ipmqtt
```
Cambiando ipservidor e ipmqtt por las verdaderas IPs de los servidores.

## Puesta en marcha
Para iniciar el proyecto ejecutamos:

```bash
yarn start
```
Una vez iniciado nos dirigimos a [localhost en el puerto 3000](http://localhost:3000)

