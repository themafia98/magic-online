import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IClassTypeDocument = ClassType & Document;

@Schema()
export class ClassType {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  class_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const ClassTypeSchema = SchemaFactory.createForClass(ClassType);
