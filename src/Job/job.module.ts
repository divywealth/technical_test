import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobController } from 'src/Job/job.controller';
import { JobService } from 'src/Job/job.service';
import { Facility } from 'src/facility/facility.model';
import { NurseHiredJob } from 'src/NurseHiredJob/nurse-hired-job.model';
import { Job } from './Job.model';


@Module({
  imports: [SequelizeModule.forFeature([Job, Facility, NurseHiredJob])],
  providers: [JobService],
  controllers: [JobController],
})
export class JobsModule {}
