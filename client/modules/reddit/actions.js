import axios from 'axios';

import flux from '../../flux.js';
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './action-types.js';

export const fetchPosts = (subreddit) => {
  flux.dispatch(FETCH, { subreddit });
  axios.get(`https://www.reddit.com/r/${subreddit}.json`)
    .then(res => flux.dispatch(FETCH_SUCCESS, res.data.data.children))
    .catch(res => flux.dispatch(FETCH_FAILURE, res));
};

