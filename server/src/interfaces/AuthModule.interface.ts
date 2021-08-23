import { Types } from 'mongoose';

export interface IPayloadUser {
  sub: Types.ObjectId;
  username: string;
}
