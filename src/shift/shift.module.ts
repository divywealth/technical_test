import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { Facility } from 'src/facility/facility.model';

@Module({
  imports: [SequelizeModule.forFeature([Shift, Facility])],
  controllers: [ShiftController],
  providers: [ShiftService]
})
export class ShiftModule {}
