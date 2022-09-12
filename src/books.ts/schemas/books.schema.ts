import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({required:true})
  name: string ;

  @Prop({required:true})
  style: string;

  @Prop({required:true})
  rate: number;

  @Prop({required:true})
  author: string;

  @Prop()
  comments:Array<string>

}

export const BookSchema = SchemaFactory.createForClass(Book);