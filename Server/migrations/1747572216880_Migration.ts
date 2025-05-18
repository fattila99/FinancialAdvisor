import { Admin, Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';
import { User } from '../src/model/User';
import bcrypt from 'bcrypt';

export class Migration1747572216880 implements MigrationInterface {
  public async up(db: Db): Promise<void | never> {

    const password = 'test123';

    const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection('users').insertOne({
    email : "default@admin.com",
    name : "Default Admin",
    address : "123 Admin St.",
    password : hashedPassword,
    isAdvisor : true
  });

  const user = await db.collection('users').insertOne({
    email : "default@user.com",
    name : "Default User",
    address : "123 User St.",
    password : hashedPassword,
    isAdvisor : false
  });
}

  public async down(db: Db): Promise<void | never> {
  }
}
