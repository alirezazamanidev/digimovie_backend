namespace NodeJS {
  interface ProcessEnv {

    //App
    PORT:number
    URL_SERVER:string
    URL_CLIENT:string
    // DB
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_TYPE: string;
    // Secret jwt
    JWT_SECRET_KEY:string
  }
}
