export interface DictionaryNum<T> {
  [id: number]: T | undefined;
}
export declare abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T | undefined;
}

export function indexBy<T = any>(items: T[], key: keyof T): Dictionary<T> {
  return items.reduce<Dictionary<T>>((acc, item) => {
    const id = item[key] as any;
    if (!acc[id]) {
      acc[id] = item;
    }

    return acc;
  }, {});
}
