import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEntityLocationDocument = EntityLocation & Document;

@Schema()
export class EntityLocation {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_location_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  entity_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  location_id: Types.ObjectId;
}

export const EntityLocationSchema =
  SchemaFactory.createForClass(EntityLocation);
