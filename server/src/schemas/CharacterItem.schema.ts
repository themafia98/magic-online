import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterItemDocument = CharacterItem & Document;

@Schema()
export class CharacterItem {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_item_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_id: Types.ObjectId;
}

export const CharacterItemSchema = SchemaFactory.createForClass(CharacterItem);
