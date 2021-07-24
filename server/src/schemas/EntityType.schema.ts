import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEntityTypeDocument = EntityType & Document;

@Schema()
export class EntityType {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const EntityTypeSchema = SchemaFactory.createForClass(EntityType);
