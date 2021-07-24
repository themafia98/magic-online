import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IAttributeDocument = Attribute & Document;

@Schema()
export class Attribute {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  desc: string;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
