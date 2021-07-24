import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IItemLootDocument = ItemLoot & Document;

@Schema()
export class ItemLoot {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_loot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  loot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  drop_chance: number;
}

export const ItemLootSchema = SchemaFactory.createForClass(ItemLoot);
