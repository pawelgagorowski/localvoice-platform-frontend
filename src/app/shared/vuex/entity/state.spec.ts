import Vue from 'vue';
import Vuex from 'vuex';
import { createEntityAdapter } from './adapter';
import { EntityState } from './models';

interface TestRelatedEntity {
  id: number;
  name: string;
}

interface TestEntity {
  id: number;
  name: string;
  relatedId: number;
  relatedObj?: TestRelatedEntity;
}

type TestState = EntityState<TestRelatedEntity> & { detail: TestEntity };

Vue.use(Vuex);

describe('Vuex entity state', () => {
  it('upsert', () => {
    const entityAdapter = createEntityAdapter<TestRelatedEntity>();
    const store = new Vuex.Store<TestState>({
      state: () => entityAdapter.getInitialState({ detail: null }),
      mutations: {
        upsertMany: (state, payload) => entityAdapter.upsertMany(payload, state),
      },
    });

    expect(store.state.ids.length).toBe(0);
    expect(store.state.entities).toEqual({});

    let entity1 = { id: 1, name: 'one' };
    const entity2 = { id: 2, name: 'two' };
    store.commit('upsertMany', [entity1, entity2]);
    expect(store.state.ids).toEqual([1, 2]);
    expect(store.state.entities[1]).toEqual(entity1);
    expect(store.state.entities[2]).toEqual(entity2);

    entity1 = { id: 1, name: '1' };
    const entity3 = { id: 3, name: 'three' };
    store.commit('upsertMany', [entity1, entity3]);
    expect(store.state.ids).toEqual([1, 2, 3]);
    expect(store.state.entities[1]).toEqual(entity1);
    expect(store.state.entities[2]).toEqual(entity2);
    expect(store.state.entities[3]).toEqual(entity3);
  });

  it('upsert (sorted)', () => {
    const entityAdapter = createEntityAdapter<TestRelatedEntity>({
      sortComparer: (a, b) => a.name.localeCompare(b.name),
    });
    const store = new Vuex.Store<TestState>({
      state: () => entityAdapter.getInitialState({ detail: null }),
      mutations: {
        upsertMany: (state, payload) => entityAdapter.upsertMany(payload, state),
      },
    });

    expect(store.state.ids.length).toBe(0);
    expect(store.state.entities).toEqual({});

    const entity1 = { id: 1, name: 'one' };
    let entity2 = { id: 2, name: 'two' };
    store.commit('upsertMany', [entity2, entity1]);
    expect(store.state.ids).toEqual([1, 2]);
    expect(store.state.entities[1]).toEqual(entity1);
    expect(store.state.entities[2]).toEqual(entity2);

    entity2 = { id: 2, name: '2' };
    let entity3 = { id: 3, name: 'three' };
    store.commit('upsertMany', [entity3, entity2]);
    expect(store.state.ids).toEqual([2, 1, 3]); // '2', 'one', 'three'
    expect(store.state.entities[1]).toEqual(entity1);
    expect(store.state.entities[2]).toEqual(entity2);
    expect(store.state.entities[3]).toEqual(entity3);

    entity3 = { id: 3, name: '1' };
    store.commit('upsertMany', [entity3]);
    expect(store.state.ids).toEqual([3, 2, 1]); // '1', '2', 'one'
    expect(store.state.entities[1]).toEqual(entity1);
    expect(store.state.entities[2]).toEqual(entity2);
    expect(store.state.entities[3]).toEqual(entity3);
  });

  it('denormalized getter caching', () => {
    const entityAdapter = createEntityAdapter<TestRelatedEntity>();
    const detailGetter = jest.fn().mockImplementation(
      (state) =>
        ({
          ...state.detail,
          relatedObj: state.entities[state.detail.relatedId],
        } as TestEntity)
    );
    const store = new Vuex.Store<TestState>({
      state: () =>
        entityAdapter.getInitialState({
          detail: {
            id: 1,
            name: 'obj',
            relatedId: 2,
          },
        }),
      mutations: {
        addMany: (state, payload) => entityAdapter.addMany(payload, state),
        updateMany: (state, payload) => entityAdapter.updateMany(payload, state),
      },
      getters: {
        detail: detailGetter,
      },
    });

    store.commit('addMany', [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
    ]);
    expect(store.getters.detail.relatedObj).toEqual({ id: 2, name: 'two' });
    expect(detailGetter).toHaveBeenCalledTimes(1);

    store.commit('updateMany', [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
    ]);
    expect(store.getters.detail.relatedObj).toEqual({ id: 2, name: '2' });
    expect(detailGetter).toHaveBeenCalledTimes(1);
  });

  it('denormalized getter caching (sorted)', () => {
    const entityAdapter = createEntityAdapter<TestRelatedEntity>({
      sortComparer: (a, b) => a.name.localeCompare(b.name),
    });
    const detailGetter = jest.fn().mockImplementation(
      (state) =>
        ({
          ...state.detail,
          relatedObj: state.entities[state.detail.relatedId],
        } as TestEntity)
    );
    const store = new Vuex.Store<TestState>({
      state: () =>
        entityAdapter.getInitialState({
          detail: {
            id: 1,
            name: 'obj',
            relatedId: 2,
          },
        }),
      mutations: {
        addMany: (state, payload) => entityAdapter.addMany(payload, state),
        updateMany: (state, payload) => entityAdapter.updateMany(payload, state),
      },
      getters: {
        detail: detailGetter,
      },
    });

    store.commit('addMany', [
      { id: 2, name: 'two' },
      { id: 1, name: 'one' },
    ]);
    expect(store.getters.detail.relatedObj).toEqual({ id: 2, name: 'two' });
    expect(detailGetter).toHaveBeenCalledTimes(1);

    store.commit('updateMany', [
      { id: 2, name: '2' },
      { id: 1, name: '1' },
    ]);

    expect(store.getters.detail.relatedObj).toEqual({ id: 2, name: '2' });
    expect(detailGetter).toHaveBeenCalledTimes(1);
  });
});
