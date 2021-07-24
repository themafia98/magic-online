import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEntityAttributeDocument = EntityAttribute & Document;

@Schema()
export class EntityAttribute {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  value: number;
}

export const EntityAttributeSchema =
  SchemaFactory.createForClass(EntityAttribute);
