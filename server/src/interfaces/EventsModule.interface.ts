import { Socket } from "socket.io";


export interface ISocketUser extends Socket {
  id: string;
  x: number;
  y: number;
}

export interface ISocketUserMap {
  [key: string]: ISocketUser
}