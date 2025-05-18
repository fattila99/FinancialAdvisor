import { mongoMigrateCli } from 'mongo-migrate-ts';

mongoMigrateCli({
  uri: 'mongodb://localhost:6000',
  database: 'my_db',
  migrationsDir: __dirname,
  migrationsCollection: 'migrations',
});
