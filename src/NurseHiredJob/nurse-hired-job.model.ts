import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Job } from 'src/Job/Job.model';
import { Nurse } from 'src/Nurse/Nurse.model';


@Table({ tableName: 'nurse_hired_jobs', timestamps: false })
export class NurseHiredJob extends Model<NurseHiredJob> {
  @ForeignKey(() => Job)
  @Column
  job_id: number;

  @BelongsTo(() => Job)
  job: Job;

  @ForeignKey(() => Nurse)
  @Column
  nurse_id: number;

  @BelongsTo(() => Nurse)
  nurse: Nurse;
}