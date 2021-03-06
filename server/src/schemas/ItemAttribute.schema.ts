import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IItemAttributeDocument = ItemAttribute & Document;

@Schema()
export class ItemAttribute {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  value: number;
}

export const ItemAttributeSchema = SchemaFactory.createForClass(ItemAttribute);
