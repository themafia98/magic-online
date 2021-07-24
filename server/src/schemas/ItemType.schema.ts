import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IItemTypeDocument = ItemType & Document;

@Schema()
export class ItemType {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  desc: string;
}

export const ItemTypeSchema = SchemaFactory.createForClass(ItemType);
