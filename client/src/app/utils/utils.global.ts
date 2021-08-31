export const setTextMask = (value: string) => {
  if (!value) {
    return '';
  }

  return Array.from({ length: value.length })
    .map(() => '•')
    .join('');
};

export const subscribePage = (callback: () => any) => {
  const appNode = document.getElementById('app');

  if (!appNode) {
    throw new Error('Invalid initialize app');
  }

  const observer = new MutationObserver(callback);
  observer.observe(appNode, {
    characterData: false,
    childList: true,
    attributes: false,
  });

  document.addEventListener('DOMContentLoaded', callback);
};

export const setValueToMap = <V = any, K = string>(value: V, key: K, map: Map<K, V>): Map<K, V> => {
  if (map.has(key)) {
    map.delete(key);
  }

  map.set(key, value);

  return map;
};

export const toObjectMap = <T>(map: Map<string, T>) => {
  const objectMap = Object.fromEntries(new Set(map.entries()));

  return objectMap;
};
