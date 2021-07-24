import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterPartyDocument = CharacterParty & Document;

@Schema()
export class CharacterParty {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_party_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  party_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  party_leader: Types.ObjectId;
}

export const CharacterPartySchema =
  SchemaFactory.createForClass(CharacterParty);
