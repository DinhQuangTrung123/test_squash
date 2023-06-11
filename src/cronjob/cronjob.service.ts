import { Injectable, 
         NotFoundException, 
         HttpException, 
         HttpStatus,
         BadRequestException
        } from '@nestjs/common';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CreateCronjobDTO, CronjobDTO } from './dtos/create-cronjob.dto';
import { ProductService } from 'src/product/product.service'; 

@Injectable()
export class CronjobService {
    constructor(
        private productService: ProductService,
        private schedulerRegistry: SchedulerRegistry
    ) { }

     async createcronjobmesseger(jobName: string, time: string) {
        try {
                const job = new CronJob(`${time} * * * * *`, () => {
                    console.log(`time (${time}) for job ${jobName} to run!`)
                },
            )
        
            await this.schedulerRegistry.addCronJob(jobName, job);
            job.start();
            console.log(`Job ${jobName} start ...`)
        }catch (error) { 
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                cause: 'Something bad happened with name cronjob!',
              }, HttpStatus.FORBIDDEN);
        }
        // console.log(`Job ${jobName} added for every ${time} seconds`)
    }

    async stopCronJob(cronjobDTO: CronjobDTO) {
        // console.log(jobName)
        try {
            const {jobName} = cronjobDTO
            const job = this.schedulerRegistry.getCronJob(jobName);
            job.stop();
            console.log(`Job ${jobName} stop ...`)
        }
        catch (error) { 
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                cause: 'Something bad happened with name cronjob!',
              }, HttpStatus.FORBIDDEN);
        }
    }
    
    async deleteJob(cronjobDTO: CronjobDTO) {
        try {
            const {jobName} = cronjobDTO
            this.schedulerRegistry.deleteCronJob(jobName);
            console.log(`Job ${jobName} delete ...`)
        }
        catch (error) { 
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                cause: 'Something bad happened with name cronjob!',
              }, HttpStatus.FORBIDDEN);
        }
    }

    async getallcronJob() {
        try {
            const jobs = this.schedulerRegistry.getCronJobs();
            let cronjob = []
            jobs.forEach((value, key, map) => {
            //   console.log("Value:", value);
              cronjob.push({
                "name":key,
                "running": value.running,
                "next ": value.nextDates()
              })
            })
            return cronjob
        }
        catch (error) { 
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                cause: 'Something bad happened with cronjob!',
              }, HttpStatus.FORBIDDEN);
        }
    }

}
