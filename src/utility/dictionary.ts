import { Dictionary as IDictionary } from '../interfaces/dictionary';

export function add<T>(
  dictionary: IDictionary<T>,
  key: keyof T,
  item: T
): IDictionary<T> {
  return { ...dictionary, [key]: item };
}

export function filter<T>(
  dictionary: IDictionary<T>,
  filter: (item: T) => boolean
): IDictionary<T> {
  const result = Object.entries(dictionary).reduce((acc, [key, item]) => {
    if (!filter(item)) return acc;
    return { ...acc, [key]: item };
  }, {});
  return result;
}

export function pick<T, K extends keyof T>(item: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce<any>((acc, key) => ({ ...acc, [key]: item[key] }), {});
}

export function map<T, F extends (item: T) => any>(
  items: IDictionary<T>,
  fn: F
): IDictionary<ReturnType<F>> {
  const result = Object.entries(items).reduce((acc, [key, item]) => {
    const mapped = fn(item);
    return { ...acc, [key]: mapped !== item ? mapped : item };
  }, {});
  return result;
}
