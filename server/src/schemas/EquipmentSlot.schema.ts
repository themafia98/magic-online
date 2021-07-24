import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

export type IEquipmentSlotDocument = EquipmentSlot & Document;

@Schema()
export class EquipmentSlot {
  @Prop({ required: true, type: SchemaMongoose.Types.ObjectId })
  equipment_slot_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaMongoose.Types.String })
  name: string;
}

export const EquipmentSlotSchema = SchemaFactory.createForClass(EquipmentSlot);
