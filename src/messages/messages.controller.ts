import { Controller, Post, Body, Inject, forwardRef, Get } from '@nestjs/common';

@Controller('sendmessages')
export class MessagesController {

    @Post('/webhook')
    async getmessages(){
        
        return {"create all": "successful"}
   }
}


