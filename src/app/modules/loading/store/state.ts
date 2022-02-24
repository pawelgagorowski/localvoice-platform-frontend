export const NAMESPACE = 'loading';

export interface LoadingState {
  loading: {
    structure: boolean;
  };
}

export function initialState(): LoadingState {
  return {
    loading: {
      structure: false,
    },
  };
}
