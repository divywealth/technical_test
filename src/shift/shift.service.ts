import { Injectable } from '@nestjs/common';
import { Facility } from 'src/facility/facility.model';
import { Shift } from './shift.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ShiftService {
    constructor(
        @InjectModel(Shift)
        private readonly shiftModel: typeof Shift,
    ) {}

    async getAllShiftsWithFacilities() {
        return this.shiftModel.findAll({
          include: [{ model: Facility, attributes: ['name'] }],
        });
      }
}
