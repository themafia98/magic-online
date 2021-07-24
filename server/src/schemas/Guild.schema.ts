import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IGuildDocument = Guild & Document;

@Schema()
export class Guild {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  guild_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
