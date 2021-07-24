import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IUserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  user_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  username: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  email: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
