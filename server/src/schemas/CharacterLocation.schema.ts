import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterLocationDocument = CharacterLocation & Document;

@Schema()
export class CharacterLocation {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_location_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  location_id: Types.ObjectId;
}

export const CharacterLocationSchema =
  SchemaFactory.createForClass(CharacterLocation);
