"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterForm } from "@/components/FilterForm";
import { Pagination } from "@/components/Pagination";
import { PostsTable } from "@/components/PostsTable";
import {
  buildPostsPagePath,
  buildPostsUrl,
  createPageNumbers,
  getFiltersFromSearchParams,
  getPageFromSearchParams,
  getTotalPages,
  parseTotalCount,
} from "@/utils/posts";
import type { Post, PostFilters } from "@/types/posts";

const initialFilters: PostFilters = {
  userId: "",
  postId: "",
  title: "",
  body: "",
};

export default function Home() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
      <PostsPage />
    </Suspense>
  );
}

function PostsPage() {
  const searchParams = useSearchParams();
  const urlFilters = useMemo(
    () => getFiltersFromSearchParams(searchParams),
    [searchParams],
  );
  const urlPage = useMemo(
    () => getPageFromSearchParams(searchParams),
    [searchParams],
  );

  return (
    <PostsPageContent
      key={searchParams.toString()}
      activeFilters={urlFilters}
      page={urlPage}
    />
  );
}

type PostsPageContentProps = {
  activeFilters: PostFilters;
  page: number;
};

function PostsPageContent({ activeFilters, page }: PostsPageContentProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [draftFilters, setDraftFilters] = useState<PostFilters>(activeFilters);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(buildPostsUrl(activeFilters, page));

        if (!response.ok) {
          throw new Error("Unable to load posts. Please try again later.");
        }

        const data = (await response.json()) as Post[];

        if (isMounted) {
          setPosts(data);
          setTotalCount(
            parseTotalCount(response.headers.get("x-total-count"), data.length),
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Something went wrong while loading posts.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [activeFilters, page]);

  const totalPages = getTotalPages(totalCount) as number;
  const pageNumbers = useMemo(
    () => createPageNumbers(totalPages) as number[],
    [totalPages],
  );

  function handleSubmit() {
    router.push(buildPostsPagePath(draftFilters, 1));
  }

  function handleReset() {
    setDraftFilters(initialFilters);
    router.push(buildPostsPagePath(initialFilters, 1));
  }

  function handlePageChange(nextPage: number) {
    router.push(buildPostsPagePath(activeFilters, nextPage));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <FilterForm
          filters={draftFilters}
          isLoading={isLoading}
          onChange={setDraftFilters}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />

        <PostsTable error={error} isLoading={isLoading} posts={posts} />

        <Pagination
          currentPage={page}
          isDisabled={isLoading || Boolean(error)}
          pageNumbers={pageNumbers}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
