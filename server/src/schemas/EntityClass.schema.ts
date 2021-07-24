import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEntityClassDocument = EntityClass & Document;

@Schema()
export class EntityClass {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_class_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  class_id: Types.ObjectId;
}

export const EntityClassSchema = SchemaFactory.createForClass(EntityClass);
