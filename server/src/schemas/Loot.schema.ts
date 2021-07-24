import { Document, Schema as SchemaMongoose, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ILootDocument = Document;

@Schema()
export class Loot {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  loot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  xp: number;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  money: number;
}

export const LootSchema = SchemaFactory.createForClass(Loot);
