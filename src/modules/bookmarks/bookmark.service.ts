import { Bookmark } from "./bookmark.types";
import { randomUUID } from "crypto";

const bookmarks: Bookmark[] = [];

export function createBookmark(
  url: string,
  title: string,
  description?: string
): Bookmark {
  const bookmark: Bookmark = {
    id: randomUUID(),
    url,
    title,
    description,
    createdAt: new Date(),
  };

  bookmarks.push(bookmark);
  return bookmark;
}

export function getAllBookmarks(): Bookmark[] {
  return bookmarks;
}