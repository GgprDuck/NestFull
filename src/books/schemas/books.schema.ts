import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    style: string;

  @Prop({ required: true })
    rate: number;

  @Prop({ required: true })
    author: string;

  @Prop()
    comments:Array<string>;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
