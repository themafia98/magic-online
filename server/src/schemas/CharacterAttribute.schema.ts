import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterAttributeDocument = CharacterAttribute & Document;

@Schema()
export class CharacterAttribute {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  attribute_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  value: string;
}

export const CharacterAttributeSchema =
  SchemaFactory.createForClass(CharacterAttribute);
