import { Request, Response } from "express";
import { createBookmark, getAllBookmarks } from "./bookmark.service";
import { successResponse } from "../../utils/apiResponse";

export function createBookmarkHandler(req: Request, res: Response) {
  const {url, title, description} = req.body;

  const bookmark = createBookmark(url, title, description);

  res.status(201).json(
    successResponse(bookmark, 'Bookmark Created')
  );
}

export function getBookmarkHandler(req: Request, res:Response) {
  const bookmarks = getAllBookmarks();

  res.json(
    successResponse(bookmarks)
  );
}