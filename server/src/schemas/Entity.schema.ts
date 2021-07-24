import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEntityDocument = Entity & Document;

@Schema()
export class Entity {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  level: number;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
