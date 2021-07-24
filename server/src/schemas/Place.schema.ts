import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IPlaceDocument = Place & Document;

export const placeSchemaName = 'Place';

@Schema()
export class Place {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  place_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
