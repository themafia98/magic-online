import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterTypeDocument = CharacterType & Document;

@Schema()
export class CharacterType {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const CharacterTypeSchema = SchemaFactory.createForClass(CharacterType);
