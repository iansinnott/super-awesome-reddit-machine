import { Store, toImmutable } from 'nuclear-js';
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '../action-types.js';

const onFetch = (state) => {
  console.log('Oh yeah fetching posts oh yeah');
  return state;
};

/**
 * Fully replaces this state key with a map of posts.
 */
const onFetchSuccess = (state, posts) => {
  return toImmutable(posts)
    .map(post => post.get('data')) // Must get post.data to actually access useful info
    .toMap()
    .mapKeys((k, v) => v.get('id'));
};

/**
 * Oh noes...
 */
const onFetchFailure = (state, err) => {
  console.error(err);
  return state;
};

export const isLoading = new Store({
  getInitialState() { return false; },
  initialize() {
    this.on(FETCH, () => true);
    this.on(FETCH_SUCCESS, () => false);
    this.on(FETCH_FAILURE, () => false);
  },
});

export const posts = new Store({
  getInitialState() {
    return toImmutable({});
  },
  initialize() {
    this.on(FETCH, onFetch);
    this.on(FETCH_SUCCESS, onFetchSuccess);
    this.on(FETCH_FAILURE, onFetchFailure);
  },
});
