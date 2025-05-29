import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Job } from 'src/Job/Job.model';
import { Nurse } from 'src/Nurse/Nurse.model';
import { NurseHiredJob } from 'src/NurseHiredJob/nurse-hired-job.model';
import { NurseAvailableJobs } from 'src/Utils/interfaces';
import { Op } from 'sequelize';


@Injectable()
export class NurseService {
    constructor(
        @InjectModel(Nurse)
        private readonly nurseModel: typeof Nurse,
        @InjectModel(Job) private jobModel: typeof Job,
        @InjectModel(NurseHiredJob) private hiredModel: typeof NurseHiredJob,
    ) {}

    async getAvailableJobsPerNurse(): Promise<NurseAvailableJobs[]> {
        const nurses: Nurse[] = await this.nurseModel.findAll({
          include: [{ model: NurseHiredJob, attributes: ['job_id'] }],
        });
      
        const allJobs: Job[] = await this.jobModel.findAll({
          include: [{ model: NurseHiredJob, attributes: ['nurse_id'] }],
        });
      
        const results: NurseAvailableJobs[] = nurses.map(nurse => {
          const hiredJobIds = new Set(nurse.hiredJobs.map(hj => hj.job_id));
          let availableJobCount = 0;
      
          for (const job of allJobs) {
            if (job.nurse_type_needed !== nurse.nurse_type) continue;
      
            const nursesHired = job.hiredJobs?.length || 0;
            const remainingSpots = job.total_number_nurses_needed - nursesHired;
            if (remainingSpots <= 0) continue;
      
            if (!hiredJobIds.has(job.id)) {
              availableJobCount++;
            }
          }
      
          return {
            nurse_id: nurse.id,
            nurse_name: nurse.nurse_name,
            nurse_type: nurse.nurse_type,
            total_jobs_available: availableJobCount,
          };
        });
      
        return results.sort((a, b) => a.nurse_id - b.nurse_id);
    }

    async getCoworkersByNurseName(nurseName: string): Promise<{ nurse_name: string }[]> {
        const targetNurse: Nurse | null = await this.nurseModel.findOne({
            where: { nurse_name: nurseName },
            include: [
              {
                model: NurseHiredJob,
                include: [
                  {
                    model: Job,
                    attributes: ['facility_id'],
                  },
                ],
              },
            ],
          });
      
          if (!targetNurse) {
            throw new Error(`Nurse with name ${nurseName} not found`);
          }
      
          const facilityIds = new Set<number>();
          targetNurse.hiredJobs.forEach(hj => {
            facilityIds.add(hj.job.facility_id);
          });
      
          const coworkers: Nurse[] = await this.nurseModel.findAll({
            where: {
              id: {
                [Op.ne]: targetNurse.id,
              },
            },
            include: [
              {
                model: NurseHiredJob,
                include: [
                  {
                    model: Job,
                    where: {
                      facility_id: [...facilityIds],
                    },
                  },
                ],
              },
            ],
          });
      
          return coworkers.map(nurse => ({
            nurse_name: nurse.nurse_name,
          }));
    }
}
