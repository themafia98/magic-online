import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IAccountConfigDocument = AccountConfig & Document;

@Schema()
export class AccountConfig {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  conf_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  name: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  value: Types.ObjectId;
}

export const AccountConfigSchema = SchemaFactory.createForClass(AccountConfig);
