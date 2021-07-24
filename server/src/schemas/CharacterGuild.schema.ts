import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterGuildDocument = CharacterGuild & Document;

@Schema()
export class CharacterGuild {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_guild_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  guild_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  guild_leader: Types.ObjectId;
}

export const CharacterGuildSchema =
  SchemaFactory.createForClass(CharacterGuild);
