import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'Jayphen',
  database: 'task_management',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
