export = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [`${process.env.DATABASE_MIGRATION_FOLDER}/*.ts`],
  cli: {
    migrationsDir: process.env.DATABASE_MIGRATION_FOLDER
  },
  migrationsRun: true,
  entities: [process.env.DATABASE_ENTITIES_FOLDER],
  dropSchema: process.env.DATABASE_DROP_SCHEMA === 'true',
  synchronize: process.env.NODE_ENV !== 'production',
};