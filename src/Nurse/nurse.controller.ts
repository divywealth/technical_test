import { Controller, Get, Query } from '@nestjs/common';
import { NurseService } from './nurse.service';

@Controller('nurse')
export class NurseController {
    constructor (
        private readonly nurseService: NurseService
    ) {}

    @Get('getAvailableJobsPerNurse')
    async getAvailableJobsPerNurse () {
        return this.nurseService.getAvailableJobsPerNurse()
    }

    @Get('coworkers')
  async getCoworkersByName(@Query('name') nurseName: string) {
    return this.nurseService.getCoworkersByNurseName(nurseName);
  }
    
}
