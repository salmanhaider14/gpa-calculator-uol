import { writable } from "svelte/store";
function posts() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    addPosts: (posts: any) => {
      set(posts);
    },
    resetPosts: () => set([]),
  };
}
export const postsStore: any = posts();
