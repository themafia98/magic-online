import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IAbilityClassDocument = Ability & Document;

@Schema()
export class Ability {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  ability_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  ability_type_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;

  @Prop({ required: true, type: SchemaMongoose.Types.Number })
  required_level: number;
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
