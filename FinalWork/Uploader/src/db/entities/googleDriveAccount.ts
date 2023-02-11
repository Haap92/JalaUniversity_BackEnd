import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class GoogleDriveAccount {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  email: string;

  @Column()
  clientID: string;

  @Column()
  clientSecret: string;

  @Column()
  redirectUri: string;

  @Column()
  refreshToken: string;
}