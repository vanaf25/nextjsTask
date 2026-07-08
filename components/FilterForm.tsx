import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { EMPTY_POST_FILTERS } from "@/utils/posts";
import type { PostFilters } from "@/types/posts";

type FilterFormProps = {
  filters: PostFilters;
  isLoading: boolean;
  onReset: () => void;
  onSubmit: (filters: PostFilters) => void;
};

const userIds = Array.from({ length: 10 }, (_, index) => index + 1);

export function FilterForm({
  filters,
  isLoading,
  onReset,
  onSubmit,
}: FilterFormProps) {
  const { handleSubmit, register, reset } = useForm<PostFilters>({
    values: filters,
  });

  function handleReset() {
    reset(EMPTY_POST_FILTERS);
    onReset();
  }

  return (
    <section className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <form
          className="grid gap-4 lg:grid-cols-[180px_180px_minmax(220px,1fr)_minmax(220px,1fr)_auto_auto]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-control flex flex-col gap-2 text-sm font-medium">
            User
            <select
              className="select select-bordered h-11 w-full"
              {...register("userId")}
            >
              <option value="">All users</option>
              {userIds.map((userId) => (
                <option key={userId} value={userId}>
                  User {userId}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control flex flex-col gap-2 text-sm font-medium">
            Post ID
            <TextInput
              min="1"
              placeholder="Any post"
              type="number"
              {...register("postId")}
            />
          </label>

          <label className="form-control flex flex-col gap-2 text-sm font-medium">
            Title
            <TextInput
              placeholder="Search title"
              type="search"
              {...register("title")}
            />
          </label>

          <label className="form-control flex flex-col gap-2 text-sm font-medium">
            Body
            <TextInput
              placeholder="Search body"
              type="search"
              {...register("body")}
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
            onClick={handleReset}
          >
            Reset
          </Button>
        </form>
      </div>
    </section>
  );
}
