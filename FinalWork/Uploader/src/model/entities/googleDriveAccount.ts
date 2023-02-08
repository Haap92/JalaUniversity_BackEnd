import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class GoogleDriveAccount {
  @ObjectIdColumn({ name: '_id' })
  id!: string;

  @Column()
  email!: string;

  @Column()
  googleDriveKey!: string;
}