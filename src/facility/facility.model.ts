import { Column, Model, Table, HasMany, PrimaryKey, DataType } from 'sequelize-typescript';
import { Job } from 'src/Job/Job.model';
import { Shift } from 'src/shift/shift.model';

@Table({ tableName: 'facilities', timestamps: false })
export class Facility extends Model<Facility> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  facility_id: number;

  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Shift)
  shifts: Shift[];

  @HasMany(() => Job)
  jobs: Job[];
}