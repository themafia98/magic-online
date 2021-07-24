import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  alive: number;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  level: number;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  xp: number;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  money: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
