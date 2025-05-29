import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Facility } from 'src/facility/facility.model';
import { NurseHiredJob } from 'src/NurseHiredJob/nurse-hired-job.model';

@Table({ tableName: 'jobs', timestamps: false })
export class Job extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  job_id: number;

  @ForeignKey(() => Facility)
  @Column(DataType.INTEGER)
  facility_id: number;

  @BelongsTo(() => Facility)
  facility: Facility;

  @Column(DataType.STRING)
  nurse_type_needed: string;

  @Column(DataType.INTEGER)
  total_number_nurses_needed: number;

  @HasMany(() => NurseHiredJob)
  hiredJobs: NurseHiredJob[];
}