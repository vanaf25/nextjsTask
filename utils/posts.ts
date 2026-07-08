import type { PostFilters } from "../types/posts";

export const POSTS_PER_PAGE = 10;
export const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

type SearchParamsReader = Pick<URLSearchParams, "get">;

export function buildPostsUrl(
  filters: PostFilters,
  page: number,
  pageSize = POSTS_PER_PAGE,
) {
  const url = new URL(POSTS_API_URL);
  const userId = filters.userId.trim();
  const postId = filters.postId.trim();

  url.searchParams.set("_page", String(page));
  url.searchParams.set("_limit", String(pageSize));

  if (userId) {
    url.searchParams.set("userId", userId);
  }

  if (postId) {
    url.searchParams.set("id", postId);
  }

  return url.toString();
}

export function getFiltersFromSearchParams(
  searchParams: SearchParamsReader,
): PostFilters {
  return {
    userId: searchParams.get("userId") ?? "",
    postId: searchParams.get("postId") ?? "",
  };
}

export function getPageFromSearchParams(searchParams: SearchParamsReader) {
  const page = Number(searchParams.get("page"));

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function buildPostsPagePath(filters: PostFilters, page: number) {
  const searchParams = new URLSearchParams();
  const userId = filters.userId.trim();
  const postId = filters.postId.trim();

  if (userId) {
    searchParams.set("userId", userId);
  }

  if (postId) {
    searchParams.set("postId", postId);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();

  return queryString ? `/?${queryString}` : "/";
}

export function getTotalPages(totalCount: number, pageSize = POSTS_PER_PAGE) {
  return Math.max(1, Math.ceil(totalCount / pageSize));
}

export function createPageNumbers(totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function parseTotalCount(headerValue: string | null, fallbackCount: number) {
  if (!headerValue?.trim()) {
    return fallbackCount;
  }

  const parsedCount = Number(headerValue);

  return Number.isFinite(parsedCount) ? parsedCount : fallbackCount;
}
