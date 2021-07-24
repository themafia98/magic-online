import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEntityLootDocument = EntityLoot & Document;

@Schema()
export class EntityLoot {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_loot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  loot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_id: Types.ObjectId;
}

export const EntityLootSchema = SchemaFactory.createForClass(EntityLoot);
