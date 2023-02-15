import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class DownloadFile {

  @PrimaryColumn()
  id!: number;

  @Column()
  uploaderId: string;

  @Column()
  driveId: string;

  @Column()
  webViewLink: string;

  @Column()
  webContentLink: string;

  @Column()
  size: number;
  
  @Column()
  accountId: string;

}