import type { Post } from "@/types/posts";

type PostsTableProps = {
  error: string;
  isLoading: boolean;
  posts: Post[];
};

export function PostsTable({ error, isLoading, posts }: PostsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-600">
            <tr>
              <th className="w-20 px-4 py-3 font-semibold">ID</th>
              <th className="w-28 px-4 py-3 font-semibold">User</th>
              <th className="min-w-64 px-4 py-3 font-semibold">Title</th>
              <th className="min-w-96 px-4 py-3 font-semibold">Body</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading &&
              Array.from({ length: 8 }, (_, index) => (
                <tr key={index}>
                  <td className="px-4 py-4" colSpan={4}>
                    <div className="h-4 animate-pulse rounded bg-slate-200" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              !error &&
              posts.map((post) => (
                <tr key={post.id} className="align-top hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {post.id}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    User {post.userId}
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {post.title}
                  </td>
                  <td className="px-4 py-4 leading-6 text-slate-600">
                    {post.body}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="border-t border-red-100 bg-red-50 px-4 py-8 text-center text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="border-t border-slate-100 px-4 py-10 text-center text-sm text-slate-600">
          No posts match the selected filters.
        </div>
      )}
    </div>
  );
}
