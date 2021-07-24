import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterClassDocument = CharacterClass & Document;

@Schema()
export class CharacterClass {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_class_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  class_id: Types.ObjectId;
}

export const CharacterClassSchema =
  SchemaFactory.createForClass(CharacterClass);
