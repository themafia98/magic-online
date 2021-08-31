import { IPayload, ISocketUser } from "../interfaces/EventsModule.interface";


export const toPayload = <T>(jsonString: string): IPayload<T> => {
  return JSON.parse(jsonString) as IPayload<T>
}

export const setValueToMap = <V = any, K = string>(value: V, key: K, map: Map<K, V>): Map<K, V> => {
  if (map.has(key)) {
    map.delete(key);
  }

  map.set(key, value)

  return map;
}

export const toObjectMap = <T>(map: Map<string, T>) => {
  const objectMap = Object.fromEntries(new Set(map.entries()))

  return objectMap;
}