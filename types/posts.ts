export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostFilters = {
  userId: string;
  postId: string;
  title: string;
  body: string;
};
