module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'thinh251198',
  database: 'postgres',
  synchronize: true, 
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/**/*.{ts,js}'],
};