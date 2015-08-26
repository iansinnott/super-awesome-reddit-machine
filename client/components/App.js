import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import 'font-awesome-webpack';
import cx from 'classnames';

import flux from '../flux.js';
import style from './App.styl';
import Reddit from '../modules/reddit';

const PostListItem = React.createClass({

  propTypes: {
    post: PropTypes.instanceOf(Immutable.Map),
  },

  render() {
    const { post } = this.props;
    return (
      <li>
        <a href={post.get('url')}>{post.get('title')}</a>
      </li>
    );
  },

});

const PostList = React.createClass({

  propTypes: {
    posts: PropTypes.instanceOf(Immutable.List).isRequired,
  },

  render() {
    return (
      <ul>
        {this.props.posts.map(post => {
          return <PostListItem key={post.get('id')} post={post} />;
        })}
      </ul>
    );
  },

});

/**
 * One of the worlds most sophisticated loading spinners...
 */
const LoadingSpinner = React.createClass({
  render() {
    return <h1>Loading...</h1>;
  },
});

export default React.createClass({

  displayName: 'App',

  mixins: [flux.ReactMixin],

  getDataBindings() {
    const { posts, isLoading } = Reddit.getters;
    return {
      posts,
      isLoading,
    };
  },

  handleSelectReddit(e) {
    if (e.which !== 13) return;
    const node = e.target;
    const subreddit = node.value.trim();
    node.value = '';
    Reddit.actions.fetchPosts(subreddit);
  },

  render() {
    const classes = cx({
      [style.App]: true,
      [style.loading]: this.state.isLoading,
    });

    return (
      <div className={classes}>
        <h1>Super awesome reddit machine</h1>
        <input
          onKeyDown={this.handleSelectReddit}
          placeholder='Enter subreddit name...'
          type='text'/>
        {(this.state.isLoading)
          ? <LoadingSpinner />
          : <PostList posts={this.state.posts} />}
      </div>
    );
  },

});

