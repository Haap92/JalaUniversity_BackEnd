import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class UploadedFile {
  @ObjectIdColumn({ name: '_id' })
  id!: string;

  @Column()
  name!: string;

  @Column()
  size!: string;

  @Column()
  driveId!: string;

  @Column()
  status!: string;
}