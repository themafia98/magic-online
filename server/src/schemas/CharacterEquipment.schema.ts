import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type ICharacterEquipmentDocument = CharacterEquipment & Document;

@Schema()
export class CharacterEquipment {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_equipment_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  equipment_slot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  character_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  item_id: Types.ObjectId;
}

export const CharacterEquipmentSchema =
  SchemaFactory.createForClass(CharacterEquipment);
