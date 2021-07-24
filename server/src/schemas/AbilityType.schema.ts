import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IAbilityTypeDocument = AbilityType & Document;

@Schema()
export class AbilityType {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  ability_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  desc: string;
}

export const AbilityTypeSchema = SchemaFactory.createForClass(AbilityType);
