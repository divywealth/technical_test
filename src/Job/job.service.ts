import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Facility } from 'src/facility/facility.model';
import { NurseHiredJob } from 'src/NurseHiredJob/nurse-hired-job.model';
import { Job } from './Job.model';

@Injectable()
export class JobService {
    constructor (
        @InjectModel(Job)
        private readonly jobModel: typeof Job,
    ) {}

    async getRemainingSpots () {
        const jobs = await this.jobModel.findAll({
            include: [
              {
                model: Facility,
                attributes: ['id', 'facility_name'],
              },
              {
                model: NurseHiredJob,
                attributes: ['nurse_id'],
              },
            ],
        });
        const results = jobs.map(job => {
            const hiredCount = job.hiredJobs?.length || 0;
            const remaining = job.total_number_nurses_needed - hiredCount;
      
            return {
              facility_id: job.facility_id,
              facility_name: job.facility?.name,
              nurse_type: job.nurse_type_needed,
              total_number_nurses_needed: job.total_number_nurses_needed,
              nurses_hired: hiredCount,
              remaining_spots: remaining,
            };
          });
      
          // Sort by facility_id then nurse_type
          results.sort((a, b) => {
            if (a.facility_id === b.facility_id) {
              return a.nurse_type.localeCompare(b.nurse_type);
            }
            return a.facility_id - b.facility_id;
          });
      
          return results;
    }


}
