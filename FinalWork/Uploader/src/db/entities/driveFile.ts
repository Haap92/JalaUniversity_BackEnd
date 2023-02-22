import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class DriveFile {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  uploaderId: string;

  @Column()
  driveId: string;

  @Column()
  name: string;

  @Column()
  webViewLink: string;

  @Column()
  webContentLink: string;

  @Column()
  size: number;

  @Column()
  accountId: string;

}