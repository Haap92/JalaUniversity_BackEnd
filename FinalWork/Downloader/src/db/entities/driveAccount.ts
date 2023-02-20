import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class DriveAccount {

  @PrimaryColumn()
  id!: number;

  @Column()
  accountId: string;

  @Column()
  downloadsTotal: number

  @Column()
  downloadsToday: number

  @Column()
  consecutiveDownloads: number

  @Column()
  acumulatedSizeTotal: number;

  @Column()
  acumulatedSizeDay: number;
}