import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    email: string;

  @Prop({ required: true })
    password: string;

  @Prop({ required: true })
    accessTocken:string;

  @Prop({ required: true })
    refreshTocken:string;

  @Prop({ required: true })
    isEnaibled:Boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
