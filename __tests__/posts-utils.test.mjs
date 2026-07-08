import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPostsPagePath,
  buildPostsUrl,
  createPageNumbers,
  getFiltersFromSearchParams,
  getPageFromSearchParams,
  getTotalPages,
  parseTotalCount,
  POSTS_API_URL,
} from "../utils/posts.ts";

test("buildPostsUrl includes pagination params", () => {
  const url = new URL(buildPostsUrl({ userId: "", postId: "" }, 2, 10));

  assert.equal(url.origin + url.pathname, POSTS_API_URL);
  assert.equal(url.searchParams.get("_page"), "2");
  assert.equal(url.searchParams.get("_limit"), "10");
});

test("buildPostsUrl applies supported API filters", () => {
  const url = new URL(buildPostsUrl({ userId: "3", postId: "25" }, 1, 10));

  assert.equal(url.searchParams.get("userId"), "3");
  assert.equal(url.searchParams.get("id"), "25");
});

test("getFiltersFromSearchParams reads supported page filters", () => {
  const searchParams = new URLSearchParams("userId=3&postId=25");

  assert.deepEqual(getFiltersFromSearchParams(searchParams), {
    userId: "3",
    postId: "25",
  });
});

test("getPageFromSearchParams falls back to the first page", () => {
  assert.equal(getPageFromSearchParams(new URLSearchParams("page=4")), 4);
  assert.equal(getPageFromSearchParams(new URLSearchParams("page=0")), 1);
  assert.equal(getPageFromSearchParams(new URLSearchParams("page=test")), 1);
});

test("buildPostsPagePath includes only active URL params", () => {
  assert.equal(buildPostsPagePath({ userId: "", postId: "" }, 1), "/");
  assert.equal(
    buildPostsPagePath({ userId: "3", postId: "25" }, 2),
    "/?userId=3&postId=25&page=2",
  );
});

test("getTotalPages keeps pagination at least one page", () => {
  assert.equal(getTotalPages(0, 10), 1);
  assert.equal(getTotalPages(100, 10), 10);
});

test("createPageNumbers returns a page number list", () => {
  assert.deepEqual(createPageNumbers(5), [1, 2, 3, 4, 5]);
});

test("parseTotalCount falls back when the header is unavailable", () => {
  assert.equal(parseTotalCount("27", 10), 27);
  assert.equal(parseTotalCount(null, 10), 10);
  assert.equal(parseTotalCount("", 10), 10);
});
