import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { SignUpUserValid } from './interfaces/user.signup.validate';
import { SignInUserValid } from './interfaces/user.signin.validate';
import { DtoValidationPipe } from '../../validations/dto.validation.pipe';
import { LocalAuthGuard } from '../auth/guards/local.auth.guard';

@Controller('api/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('singup')
    async singup(
        @Body(DtoValidationPipe) singUpUser: SignUpUserValid
        ) {
        await this.usersService.create(singUpUser);
    }

    @UseGuards(LocalAuthGuard)
    @Post('singin')
    async singin(
        @Body(DtoValidationPipe) singInUser: SignInUserValid,
        @Request() req,
        ) {
        return this.authService.createToken({
            id: req.user.id,
            email: req.user.email,
            firstName: req.user.firstName,
        });
    }
}
