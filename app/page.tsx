"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterForm } from "@/components/FilterForm";
import { Pagination } from "@/components/Pagination";
import { PostsTable } from "@/components/PostsTable";
import { usePostsStore } from "@/stores/posts-store";
import {
  EMPTY_POST_FILTERS,
  buildPostsPagePath,
  buildPostsUrl,
  getFiltersFromSearchParams,
  getPageFromSearchParams,
  parseTotalCount,
} from "@/utils/posts";
import type { Post, PostFilters } from "@/types/posts";

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
  const isLoading = usePostsStore((state) => state.isLoading);
  const startLoading = usePostsStore((state) => state.startLoading);
  const setPostsResult = usePostsStore((state) => state.setPostsResult);
  const setPostsError = usePostsStore((state) => state.setPostsError);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      try {
        startLoading();

        const response = await fetch(buildPostsUrl(activeFilters, page));

        if (!response.ok) {
          throw new Error("Unable to load posts. Please try again later.");
        }

        const data = (await response.json()) as Post[];

        if (isMounted) {
          setPostsResult(
            data,
            parseTotalCount(response.headers.get("x-total-count"), data.length),
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setPostsError(
            fetchError instanceof Error
              ? fetchError.message
              : "Something went wrong while loading posts.",
          );
        }
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [activeFilters, page, setPostsError, setPostsResult, startLoading]);

  function handleSubmit(filters: PostFilters) {
    router.push(buildPostsPagePath(filters, 1));
  }

  function handleReset() {
    router.push(buildPostsPagePath(EMPTY_POST_FILTERS, 1));
  }

  function handlePageChange(nextPage: number) {
    router.push(buildPostsPagePath(activeFilters, nextPage));
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-8 text-base-content sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <FilterForm
          filters={activeFilters}
          isLoading={isLoading}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />

        <PostsTable />

        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
