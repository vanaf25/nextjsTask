import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { PostFilters } from "@/types/posts";

type FilterFormProps = {
  filters: PostFilters;
  isLoading: boolean;
  onChange: (filters: PostFilters) => void;
  onReset: () => void;
  onSubmit: () => void;
};

const userIds = Array.from({ length: 10 }, (_, index) => index + 1);

export function FilterForm({
  filters,
  isLoading,
  onChange,
  onReset,
  onSubmit,
}: FilterFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <form
        className="grid gap-4 lg:grid-cols-[220px_220px_auto_auto]"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          User
          <select
            className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            value={filters.userId}
            onChange={(event) =>
              onChange({
                ...filters,
                userId: event.target.value,
              })
            }
          >
            <option value="">All users</option>
            {userIds.map((userId) => (
              <option key={userId} value={userId}>
                User {userId}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Post ID
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            min="1"
            placeholder="Any post"
            type="number"
            value={filters.postId}
            onChange={(event) =>
              onChange({
                ...filters,
                postId: event.target.value,
              })
            }
          />
        </label>

        <Button
          className="self-end"
          disabled={isLoading}
          size="md"
          type="submit"
          variant="primary"
        >
          Filter
        </Button>

        <Button
          className="self-end"
          disabled={isLoading}
          size="md"
          type="button"
          onClick={onReset}
        >
          Reset
        </Button>
      </form>
    </section>
  );
}
