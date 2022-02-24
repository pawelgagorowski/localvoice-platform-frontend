import { EntityGetters, EntityState } from './models';

export function createGettersFactory<T>() {
  function createGetters(): EntityGetters<T, EntityState<T>>;
  function createGetters<V>(entityStateGetter: (state: V) => EntityState<T>): EntityGetters<T, V>;
  function createGetters(entityStateGetter?: (state: any) => EntityState<T>): EntityGetters<T, any> {
    const getIds = (state: EntityState<T>) => state.ids;
    const getEntities = (state: EntityState<T>) => state.entities;
    const getAll = (state: EntityState<T>): T[] => state.ids.map((id) => state.entities[id]) as T[];
    const getTotal = (state: EntityState<T>) => getIds(state).length;

    if (!entityStateGetter) {
      return {
        getIds,
        getEntities,
        getAll,
        getTotal,
      };
    }

    return {
      getIds: (state) => getIds(entityStateGetter(state)),
      getEntities: (state) => getEntities(entityStateGetter(state)),
      getAll: (state) => getAll(entityStateGetter(state)),
      getTotal: (state) => getTotal(entityStateGetter(state)),
    };
  }

  return { createGetters };
}
