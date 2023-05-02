
## Description

Esta aplicación NestJS es una excelente manera de comenzar a aprender a desarrollar aplicaciones Node.js utilizando el framework NestJS. Aprenderás los conceptos básicos de NestJS mientras construyes una aplicación simple pero funcional.

[NestJs Link Curso](https://www.youtube.com/playlist?list=PLergODdA95kfcSoXqZZ-IDImO6YaQLYlG)

## Instalación

```bash
$ npm install
```

## Para correr la aplicacion

1. Levantar docker `docker-compose up`
2. Una vez se levante, revisar .env, debe tener `DB_HOST,DB_NAME,DB_PORT,DB_USER,DB_PASSWORD`
3. 
```bash
# development
$ npm run start:dev
```

## Librerias utilizadas

* Morgan
* TypeOrm -> biblioteca que proporciona una capa de abstracción entre la base de datos y la aplicación
* PG -> utilizar metodos de postgres en typeOrm
* typeorm-naming-strategies -> Permite generar una estrategia, al crear una entidad, si lo hacemos con camelCase, en la BD se hará con snake_case

## ENV

Estamos usando distintos .env para distintos ambientes
Hay que tener creado minimo un

* `.develop.env`

## Mac Vs Windows

Si estás usando MAC deberás cambiar el script `start:dev` porque al setear NODE_ENV falla de la forma en que está

Para Mac: `export \"NODE_ENV=develop\" && nest start --watch`

Para Windows: `set \"NODE_ENV=develop\" && nest start --watch`