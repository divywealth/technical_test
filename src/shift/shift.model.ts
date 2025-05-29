import { Column, Model, Table, ForeignKey, BelongsTo, PrimaryKey, DataType } from 'sequelize-typescript';
import { Facility } from 'src/facility/facility.model';

@Table({ tableName: 'question_one_shifts', timestamps: false })
export class Shift extends Model<Shift> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  shift_id: number;

  @Column(DataType.STRING)
  shift_name: string;

  @ForeignKey(() => Facility)
  @Column(DataType.INTEGER)
  facility_id: number;

  @BelongsTo(() => Facility)
  facility: Facility;
}