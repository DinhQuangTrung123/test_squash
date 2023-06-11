import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //console.log('Before...');
    return next.handle().pipe(
      map((value) => {
        //console.log('Appter...');
        value = value ? value : [];
        return { status: 200, data: value, length: value.length };
      }),
    );
  }
}
