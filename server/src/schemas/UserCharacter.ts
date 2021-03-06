import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IUserCharacterDocument = UserCharacter & Document;

@Schema()
export class UserCharacter {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  user_character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;
}

export const UserCharacterSchema = SchemaFactory.createForClass(UserCharacter);
