import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './shift/shift.model';
import { Facility } from './facility/facility.model';
import { ShiftModule } from './shift/shift.module';
import { JobController } from 'src/Job/job.controller';
import { JobService } from './Job/job.service';
import { JobsModule } from './Job/job.module';
import { Nurse } from './Nurse/Nurse.model';
import { NurseHiredJob } from './NurseHiredJob/nurse-hired-job.model';
import { NurseController } from './Nurse/nurse.controller';
import { NurseModule } from 'src/Nurse/nurse.module';
import { Job } from './Job/Job.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env.development'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true, // use false in production
      models: [Shift, Facility, Job, Nurse, NurseHiredJob], // for models
    }),
    ShiftModule,
    JobsModule,
    NurseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
