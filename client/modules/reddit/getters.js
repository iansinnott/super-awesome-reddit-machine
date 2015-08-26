/**
 * React likes to throw warnings when we pass Immutable.Maps into react
 * components so we'll just use a List.
 */
export const posts = [
  ['posts'],
  posts => posts.toList(),
];

export const isLoading = ['isLoading'];
