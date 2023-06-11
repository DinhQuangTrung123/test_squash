import { Controller, Post, Body, Inject, forwardRef, Get } from '@nestjs/common';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Cron } from '@nestjs/schedule';
import { CronExpression, Interval, Timeout } from '@nestjs/schedule/dist';
import { ProductService } from 'src/product/product.service'; 
import { CreateCronjobDTO, CronjobDTO } from './dtos/create-cronjob.dto';
import { brotliDecompressSync } from 'zlib';
import { CronjobService } from './cronjob.service';


@Controller('cronjob')
export class CronjobController {
    constructor(
        private cronjobService: CronjobService,
        // private schedulerRegistry: SchedulerRegistry
    ) { }
    @Post('/createsend')
    async createcronjobsend(@Body() createCronjobDTO: CreateCronjobDTO){
        const {jobName, time} = createCronjobDTO;
        await this.cronjobService.createcronjobmesseger(jobName, time)
        return {"create job": "successful"}
   }
    
   @Post('/stopsend')
   async stopCronJobSend(@Body() cronjobDTO: CronjobDTO){
    // const {name} = jobName;
    await this.cronjobService.stopCronJob(cronjobDTO)
    return {"stop job": "successful"}
  }

  @Post('/deletejobsend')
  async deletejobsend(@Body() cronjobDTO: CronjobDTO){
    await this.cronjobService.deleteJob(cronjobDTO)
    return {"delete job": "successful"}
 }

    @Get('/getallcronjob')
        async getallgcronjob(){
        const result = await this.cronjobService.getallcronJob()
        return result
    }

    // getCronJobs() {
    //     const jobs = this.schedulerRegistry.getCronJobs();
    
    //     jobs.forEach((value, key, map) => {
    //       console.log("Value:", value.running);
    //     })
    // }

    // stopCronJob() {
    //     const job = this.schedulerRegistry.getCronJob('messaging');
    //     job.stop();
    //     console.log(job.lastDate());
    // }
    
    // deleteJob(jobName: string) {
    //     this.schedulerRegistry.deleteCronJob(jobName);
    // }
    
    // async addNewJob(jobName: string, time: string) {
    //     const job = new CronJob(`${time} * * * * *`, () => {
    //       console.log(`time (${time}) for job ${jobName} to run!`)
    //     })
    
    //     this.schedulerRegistry.addCronJob(jobName, job);
    //     job.start();
    
    //     console.log(`Job ${name} added for every ${time} seconds`)
    // }
    
    //     @Interval(2000) // chu kỳ
    //     triggerMethodBasedOnInterval(){
    //         console.log("Triggering the method after interval of 2 seconds")
    //     }
    //     @Timeout(2000) // chỉ call 1 lần
    //     async handleTimeout() {
    //         await this.addNewJob('notification','2')
    //         // console.log('call me everytime')
    //         console.log(this.getCronJobs())
    //     }

    //     addNewInterval(intervalName: string, intervalTime: number){
    //         const callback = () => {
    //           console.log(`Inteval ${intervalName} executing at time ${intervalTime}`);
    //         }
        
    //         const interval = setInterval(callback, intervalTime);
    //         this.schedulerRegistry.addInterval(intervalName, interval);
    //     }
        
        // @Cron('* * * * *') / every time
        // @Cron(CronExpression.EVERY_5_SECONDS,
        //     {
        //         name: 'everytime call'
        //     })
        // triggerCronjob(){
        //     console.log("call me everytime")
        // }
    
        // @Interval('messaging', 3500)
        // triggerMethodBasedOnNamedInterval() {
        // console.log("Triggering the method after 3.5 seconds based on named interval");
        // }
    
        // @Cron('* * * * * *', {
        //     name: 'messaging',
        //     timeZone: 'America/New_York'
        // })
        // triggerMessage(){
        //     console.log("Triggering Message Sending");
        // }
}

