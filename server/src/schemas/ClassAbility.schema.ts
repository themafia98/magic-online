import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IClassAbilityDocument = ClassAbility & Document;

@Schema()
export class ClassAbility {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  class_ability_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  class_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  ability_id: Types.ObjectId;
}

export const ClassAbilitySchema = SchemaFactory.createForClass(ClassAbility);
