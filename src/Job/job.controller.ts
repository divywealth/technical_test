import { Controller, Get } from '@nestjs/common';
import { JobService } from 'src/Job/job.service';

@Controller('job')
export class JobController {
    constructor(private readonly jobsService: JobService) {}

    @Get('remaining-spots')
    async getRemainingSpots() {
      return this.jobsService.getRemainingSpots();
    }
}
