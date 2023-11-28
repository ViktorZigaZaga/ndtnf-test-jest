import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RxjsService } from './rxjs.service';
import { IParamText } from 'src/modules/books/interfaces/text-param';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rxjs')
export class RxjsController {
    constructor(private rxjsService: RxjsService) {}


    @Get('repositories/:text')
    async repositories(@Param() {text}: IParamText) {
        return await this.rxjsService.searchRepositories(text);
    }
}
