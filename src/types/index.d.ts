/*
Con esto re-declaro lo que se encuentra en process.env.{variables}.
Si dejo el mouse sobre el process.env veré que es de tipo NodeJS.ProcessEnv 
*/

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    HASH_SALT: number;
  }
}
