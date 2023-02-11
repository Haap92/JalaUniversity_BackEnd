import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class File {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  name: string;

  @Column()
  formerName!: string;

  @Column()
  size!: number;

  @Column()
  mimetype!: string;

  @Column()
  driveId!: string;

  @Column()
  status: string;
}