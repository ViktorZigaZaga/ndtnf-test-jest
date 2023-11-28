import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { SignUpUserValid } from './interfaces/user.signup.validate'

@Injectable()
export class UsersService {
    constructor(        
        @InjectModel(User.name)
        private UserModel: Model<UserDocument>,
    ) {}

    public async create(data: SignUpUserValid): Promise<UserDocument> {
        const user = new this.UserModel(data);
        try {
            await user.save();
            return user;
        } catch (e) {
            console.error(e);
            throw new Error("Ошибка при создании пользователя")
        }
    }

    async findOne(filters: any): Promise<UserDocument | undefined> {
        return await this.UserModel.findOne(filters).select('-__v').exec();
    }
}
