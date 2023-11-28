import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: [true, 'Введите email'], unique: [true, 'Такой email уже существует'] })
    public email: string;

    @Prop({ required: [true, 'Введите пароль'] })
    public password: string;
  
    @Prop({ required: [true, 'Введите имя'] })
    public firstName: string;
  
    @Prop({ required: [true, 'Введите фамилию'] })
    public lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);