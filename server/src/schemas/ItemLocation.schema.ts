import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IItemLocationDocument = ItemLocation & Document;

@Schema()
export class ItemLocation {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_location_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  location_id: Types.ObjectId;
}

export const ItemLocationSchema = SchemaFactory.createForClass(ItemLocation);
