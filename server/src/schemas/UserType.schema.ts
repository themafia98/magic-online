import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IUserTypeDocument = UserType & Document;

@Schema()
export class UserType {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  user_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
