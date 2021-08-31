import { Socket } from "socket.io";


export interface ISocketUser extends Socket {
  id: string;
  x: number;
  y: number;
}

export interface ISocketUserMap {
  [key: string]: ISocketUser
}

export interface IPayload<T> {
  payload: T
}

export interface LoadedParams {
  x: number;
  y: number;
  id: string;
}