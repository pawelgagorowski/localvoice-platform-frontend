import { createGettersFactory } from './getters';
import { Comparer, EntityAdapter, EntityDefinition, IdSelector } from './models';
import { createInitialStateFactory, createStateAdapter } from './state';

export function createEntityAdapter<T>(
  options: {
    selectId?: IdSelector<T>;
    sortComparer?: false | Comparer<T>;
  } = {}
): EntityAdapter<T> {
  const { selectId, sortComparer }: EntityDefinition<T> = {
    sortComparer: false,
    selectId: (instance: any) => instance.id,
    ...options,
  };
  const stateFactory = createInitialStateFactory<T>();
  const gettersFactory = createGettersFactory<T>();
  const stateAdapter = createStateAdapter(selectId, sortComparer);

  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...gettersFactory,
    ...stateAdapter,
  };
}
