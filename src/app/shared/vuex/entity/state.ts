/* eslint-disable no-use-before-define */
import Vue from 'vue';
import { Comparer, EntityState, EntityStateAdapter, IdSelector, Predicate, selectIdValue } from './models';

export function getInitialEntityState<V>(): EntityState<V> {
  return {
    ids: [],
    entities: {},
  };
}

export function createInitialStateFactory<V>() {
  function getInitialState(): EntityState<V>;
  function getInitialState<S extends Record<string, unknown>>(additionalState: S): EntityState<V> & S;
  function getInitialState(additionalState: any = {}): any {
    return Object.assign(getInitialEntityState(), additionalState);
  }

  return { getInitialState };
}

export function createStateAdapter<T>(selectId: IdSelector<T>, sort: false | Comparer<T>): EntityStateAdapter<T>;
export function createStateAdapter<T>(selectId: any, sort: any): any {
  type R = EntityState<T>;

  function addOne(entity: T, state: R): R;
  function addOne(entity: any, state: any): any {
    return addMany([entity], state);
  }

  function addMany(entities: T[], state: R): R;
  function addMany(entities: any[], state: any): any {
    const models = entities.filter((model) => !(selectIdValue(model, selectId) in state.entities));

    if (models.length === 0) {
      return state;
    }

    if (sort) {
      models.forEach((entity) => {
        Vue.set(state.entities, selectIdValue(entity, selectId), entity);
      });
      merge(models, state);

      return state;
    }

    models.forEach((entity) => {
      const id = selectIdValue(entity, selectId);
      state.ids.push(id);
      Vue.set(state.entities, id, entity);
    });

    return state;
  }

  function addAll(entities: T[], state: R): R;
  function addAll(entities: any[], state: any): any {
    state.ids = [];
    state.entities = {};

    addMany(entities, state);

    return state;
  }

  function removeOne(key: string | number, state: R): R;
  function removeOne(key: any, state: any): any {
    return removeMany([key], state);
  }

  function removeMany(keys: (string | number)[], state: R): R;
  function removeMany(predicate: Predicate<T>, state: R): R;
  function removeMany(keysOrPredicate: any[] | Predicate<T>, state: any): any {
    const keys =
      keysOrPredicate instanceof Array
        ? keysOrPredicate
        : state.ids.filter((key: any) => keysOrPredicate(state.entities[key]));

    const mutated = keys.filter((key: any) => key in state.entities).map((key: any) => delete state.entities[key]);

    if (mutated.length > 0) {
      state.ids = state.ids.filter((id: any) => id in state.entities);
    }

    return state;
  }

  function removeAll<S extends R>(state: S): S;
  function removeAll<S extends R>(state: any): S {
    return { ...state, ids: [], entities: {} };
  }

  function updateOne(entity: T, state: R): R;
  function updateOne(entity: any, state: any): any {
    return updateMany([entity], state);
  }

  function updateMany(entities: T[], state: R): R;
  function updateMany(entities: any[], state: any): any {
    const models = entities.filter((model) => selectIdValue(model, selectId) in state.entities);

    if (models.length === 0) {
      return state;
    }

    models.forEach((entity) => {
      Object.assign(state.entities[selectId(entity)], entity);
    });

    if (sort) {
      models.forEach((entity) => Vue.delete(state.ids, state.ids.indexOf(selectId(entity))));
      merge(models, state);
    }

    return state;
  }

  function upsertOne(entity: T, state: R): R;
  function upsertOne(entity: any, state: any): any {
    return upsertMany([entity], state);
  }

  function upsertMany<S extends EntityState<T>>(entities: T[], state: S): S {
    const added: T[] = [];
    const updated: T[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const entity of entities) {
      const id = selectIdValue(entity, selectId);
      if (id in state.entities) {
        updated.push(entity);
      } else {
        added.push(entity);
      }
    }

    addMany(added, state);
    updateMany(updated, state);

    return state;
  }

  function merge(models: T[], state: R): void;
  function merge(models: any[], state: any): void {
    models.sort(sort);

    const ids: any[] = [];

    let i = 0;
    let j = 0;

    while (i < models.length && j < state.ids.length) {
      const model = models[i];
      const modelId = selectIdValue(model, selectId);
      const entityId = state.ids[j];
      const entity = state.entities[entityId];

      if (sort(model, entity) <= 0) {
        ids.push(modelId);
        i += 1;
      } else {
        ids.push(entityId);
        j += 1;
      }
    }

    if (i < models.length) {
      state.ids = ids.concat(models.slice(i).map(selectId));
    } else {
      state.ids = ids.concat(state.ids.slice(j));
    }
  }

  return {
    addOne,
    addMany,
    addAll,
    removeOne,
    removeMany,
    removeAll,
    updateOne,
    updateMany,
    upsertOne,
    upsertMany,
  };
}
