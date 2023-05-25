
## Description

Esta aplicación NestJS es una excelente manera de comenzar a aprender a desarrollar aplicaciones Node.js utilizando el framework NestJS. Aprenderás los conceptos básicos de NestJS mientras construyes una aplicación simple pero funcional.

[NestJs Link Curso](https://www.youtube.com/playlist?list=PLergODdA95kfcSoXqZZ-IDImO6YaQLYlG)

## Instalación

```bash
$ npm install
```

## Para correr la aplicacion

1. Levantar servicio Docker
2. Levantar imagen docker `docker-compose up`
3. Una vez se levante, revisar .env, debe tener `DB_HOST,DB_NAME,DB_PORT,DB_USER,DB_PASSWORD`
4. 
```bash
# development
$ npm run start:dev
```

## Librerias utilizadas

* Morgan
* TypeOrm -> biblioteca que proporciona una capa de abstracción entre la base de datos y la aplicación
* PG -> utilizar metodos de postgres en typeOrm
* typeorm-naming-strategies -> Permite generar una estrategia, al crear una entidad, si lo hacemos con camelCase, en la BD se hará con snake_case
* class-validator -> Permite usar decoradores de nest para validar los datos de entrada (DTO)
* class-transformer -> Permite usar nest para transformar valores de entrada a otros de salida
* @nestjs/devtools-integration -> Permite usar la nueva feature de nest que es para monitorear mediante interfaz el proyecto
* jsonwebtoken -> Permite utilizar metodos para generar token de auth
* swagger -> Para crear documentación
* @nestjs/axios -> axios, para utilizar http module y hacer consultas a otros endpoints

## ENV

Estamos usando distintos .env para distintos ambientes
Hay que tener creado minimo un

* `.develop.env`

## Mac Vs Windows

Si estás usando MAC deberás cambiar el script `start:dev` porque al setear NODE_ENV falla de la forma en que está

Para Mac: `export \"NODE_ENV=develop\" && nest start --watch`

Para Windows: `set \"NODE_ENV=develop\" && nest start --watch`

## Package.json

Hay algunos scripts que estaremos utilizando en este projecto

| Script | DESCIPTION |
| ------ | ------ |
| orm:init | Con este comando de typeOrm nosotros le pasamos la ubicacion del dataSource (para la conexion a la BD)
| m:gen:dev | Generamos la migración 
| m:run:dev | Corremos la migración

# Migrations

1. Primero hay que generar el m:gen para esto usamos el comando + el path


        npm run m:gen -- src/migrations/init

2. Si todo sale bien creará un archivo dentro de la carpeta migrations

3. Terminamos con

        
        npm run m:run:dev