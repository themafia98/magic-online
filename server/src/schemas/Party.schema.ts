import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IPartyDocument = Party & Document;

@Schema()
export class Party {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  party_id: Types.ObjectId;

  @Prop({ required: false, type: SchemaMongoose.Types.String })
  type: string;
}

export const PartySchema = SchemaFactory.createForClass(Party);
