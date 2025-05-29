import { Controller, Get } from '@nestjs/common';
import { ShiftService } from './shift.service';

@Controller('shift')
export class ShiftController {
    constructor(private readonly shiftsService: ShiftService) {}

  @Get()
  async getAllShifts() {
    return this.shiftsService.getAllShiftsWithFacilities();
  }
}
