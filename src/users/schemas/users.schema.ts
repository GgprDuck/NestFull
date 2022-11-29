import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
    name: string;

  @Prop({ required: true, unique: true })
    email: string;

  @Prop({ required: true })
    password: string;

  @Prop({ default: ' ' })
    accessToken:string;

  @Prop({ default: ' ' })
    refreshToken:string;

  @Prop({ default: false })
    isEnabled:Boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
