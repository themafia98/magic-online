import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types, mongo } from 'mongoose';

export type IUserDocument = User & Document;

export interface IUser {
  user_id: Types.ObjectId;
  user_type_id: Types.ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
}

@Schema()
export class User implements IUser {
  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    default: new mongo.ObjectId(),
  })
  user_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaMongoose.Types.ObjectId,
    default: new mongo.ObjectId(),
  })
  user_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String, unique: true })
  username: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String, unique: true })
  email: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
