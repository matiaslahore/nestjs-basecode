import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseConnections = [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['src/**/*.entity{ .ts,.js}'],
      autoLoadEntities: true,
      logging: false,
      dropSchema: process.env.DATABASE_DROP_SCHEMA === 'true',
      synchronize: process.env.NODE_ENV !== 'production',
    }),
  })
];