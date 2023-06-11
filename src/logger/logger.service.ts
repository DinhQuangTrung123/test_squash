import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({scope: Scope.TRANSIENT})
export class LoggerService extends Logger{
    erorr(message: any, trace?:string, context ?: string){
        super.error(message, trace, context);
    }   
    warn(message: any, context ?: string){
        super.warn(message, context)
    }
    log(message: any, context?: string){
        super.log(message, context)
    }
    
    debug(message: any, context?: string) {
        // TO DO
        super.debug(message, context)
    }

    verbose(message: any, context?: string) {
        // TO DO
        super.verbose(message, context)
    }
}
