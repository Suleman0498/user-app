import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type ReposState = {
  repos: any[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ReposState = {
  repos: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const ReposStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setRepos(repos: any[]) {
      patchState(store, (state) => ({ repos: [ ...state.repos, ...repos ] }));
    }
  }))
);