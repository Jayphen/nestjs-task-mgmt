interface Config {
  server: {
    port: number;
  };
  db: {
    type: 'postgres' | 'mysql';
    port: number;
    database: string;
    host: string;
    username: string;
    password?: string;
    synchronize: boolean;
  };
  jwt: {
    expiresIn: number;
    secret?: string;
  };
}
