import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  required_level: string;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  durability: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
