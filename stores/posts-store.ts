import { create } from "zustand";
import type { Post } from "@/types/posts";

type PostsState = {
  error: string;
  isLoading: boolean;
  posts: Post[];
  totalCount: number;
  setPostsError: (error: string) => void;
  setPostsResult: (posts: Post[], totalCount: number) => void;
  startLoading: () => void;
};

export const usePostsStore = create<PostsState>((set) => ({
  error: "",
  isLoading: true,
  posts: [],
  totalCount: 0,
  setPostsError: (error) =>
    set({
      error,
      isLoading: false,
      posts: [],
      totalCount: 0,
    }),
  setPostsResult: (posts, totalCount) =>
    set({
      error: "",
      isLoading: false,
      posts,
      totalCount,
    }),
  startLoading: () =>
    set({
      error: "",
      isLoading: true,
    }),
}));
