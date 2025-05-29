import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NurseController } from 'src/Nurse/nurse.controller';
import { NurseService } from 'src/Nurse/nurse.service';
import { Nurse } from './Nurse.model';
import { Job } from 'src/Job/Job.model';
import { NurseHiredJob } from 'src/NurseHiredJob/nurse-hired-job.model';

@Module({
  imports: [SequelizeModule.forFeature([Nurse, Job, NurseHiredJob])],
  controllers: [NurseController],
  providers: [NurseService]
})
export class NurseModule {}
