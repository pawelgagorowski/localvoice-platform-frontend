export type ComparerStr<T> = (a: T, b: T) => string;
export type ComparerNum<T> = (a: T, b: T) => number;
export type Comparer<T> = ComparerNum<T> | ComparerStr<T>;

export type IdSelectorStr<T> = (model: T) => string;
export type IdSelectorNum<T> = (model: T) => number;
export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export function selectIdValue<T>(entity: T, selectId: IdSelector<T>) {
  const id = selectId(entity);
  if (!id) {
    throw Error(
      `${
        'The entity passed to the `selectId` implementation did not return value.' +
        ' You should probably provide your own `selectId` implementation.' +
        ' The entity that was passed: '
      }${JSON.stringify(entity)} The \`selectId\` implementation: ${selectId.toString()}`
    );
  }

  return id;
}

export interface DictionaryNum<T> {
  [id: number]: T | undefined;
}
export declare abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T | undefined;
}

export type Predicate<T> = (entity: T) => boolean;

export interface EntityState<T> {
  ids: (string | number)[];
  entities: Dictionary<T>;
}

export interface EntityDefinition<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
}

export interface EntityStateAdapter<T> {
  addOne<S extends EntityState<T>>(entity: T, state: S): S;
  addMany<S extends EntityState<T>>(entities: T[], state: S): S;
  addAll<S extends EntityState<T>>(entities: T[], state: S): S;
  removeOne<S extends EntityState<T>>(key: string, state: S): S;
  removeOne<S extends EntityState<T>>(key: number, state: S): S;
  removeMany<S extends EntityState<T>>(keys: string[], state: S): S;
  removeMany<S extends EntityState<T>>(keys: number[], state: S): S;
  removeMany<S extends EntityState<T>>(predicate: Predicate<T>, state: S): S;
  removeAll<S extends EntityState<T>>(state: S): S;
  updateOne<S extends EntityState<T>>(entity: T, state: S): S;
  updateMany<S extends EntityState<T>>(entities: T[], state: S): S;
  upsertOne<S extends EntityState<T>>(entity: T, state: S): S;
  upsertMany<S extends EntityState<T>>(entities: T[], state: S): S;
}

export interface EntityGetters<T, V> {
  getIds: (state: V) => (string | number)[];
  getEntities: (state: V) => Dictionary<T>;
  getAll: (state: V) => T[];
  getTotal: (state: V) => number;
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;

  getInitialState(): EntityState<T>;
  getInitialState<S extends Record<string, unknown>>(state: S): EntityState<T> & S;

  createGetters(): EntityGetters<T, EntityState<T>>;
  createGetters<V>(selectState: (state: V) => EntityState<T>): EntityGetters<T, V>;
}
