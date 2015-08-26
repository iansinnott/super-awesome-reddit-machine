import flux from '../../flux.js';
import { posts, isLoading } from './stores/reddit-store.js';
import * as actions from './actions.js';
import * as getters from './getters.js';

flux.registerStores({
  posts,
  isLoading,
});

export default { actions, getters };

