import { CallHandler, Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor() {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data: any) => ({ status: "success", data: data })),
                catchError((err: any) => of({ status: "fail", data: err?.message || "Ошибка при выполнении запроса" })),    
            );
    }
}