import { usePostsStore } from "@/stores/posts-store";

export function PostsTable() {
  const posts = usePostsStore((state) => state.posts);
  const isLoading = usePostsStore((state) => state.isLoading);
  const error = usePostsStore((state) => state.error);

  return (
    <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table min-w-full text-left text-sm">
          <thead className="bg-base-200 text-xs uppercase tracking-[0.12em]">
            <tr>
              <th className="w-20 px-4 py-3 font-semibold">ID</th>
              <th className="w-28 px-4 py-3 font-semibold">User</th>
              <th className="min-w-64 px-4 py-3 font-semibold">Title</th>
              <th className="min-w-96 px-4 py-3 font-semibold">Body</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {isLoading &&
              Array.from({ length: 8 }, (_, index) => (
                <tr key={index}>
                  <td className="px-4 py-4" colSpan={4}>
                    <div className="skeleton h-4 w-full" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              !error &&
              posts.map((post) => (
                <tr key={post.id} className="align-top hover:bg-base-200">
                  <td className="px-4 py-4 font-medium">
                    {post.id}
                  </td>
                  <td className="px-4 py-4 opacity-70">
                    User {post.userId}
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {post.title}
                  </td>
                  <td className="px-4 py-4 leading-6 opacity-70">
                    {post.body}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="alert alert-error rounded-none border-x-0 border-b-0 text-sm font-medium">
          {error}
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="alert rounded-none border-x-0 border-b-0 justify-center text-sm">
          No posts match the selected filters.
        </div>
      )}
    </div>
  );
}
