import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  Schema as SchemaMongoose,
  Schema as MongooseSchema,
  Types,
} from 'mongoose';
import { placeSchemaName } from './Place.schema';

export type ILocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  location_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  x: number;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  y: number;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: placeSchemaName,
  })
  place_id: Types.ObjectId;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
