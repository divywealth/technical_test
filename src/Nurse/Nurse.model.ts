import { Table, Column, Model, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { NurseHiredJob } from 'src/NurseHiredJob/nurse-hired-job.model';

@Table({ tableName: 'nurses', timestamps: false })
export class Nurse extends Model<Nurse> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  nurse_id: number;

  @Column(DataType.STRING)
  nurse_name: string;

  @Column(DataType.STRING)
  nurse_type: string;

  @HasMany(() => NurseHiredJob)
  hiredJobs: NurseHiredJob[];
}