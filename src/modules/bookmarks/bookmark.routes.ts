import { Router } from "express";
import { createBookmarkHandler, getBookmarkHandler } from "./bookmark-controller";

const router = Router();

router.post('/', createBookmarkHandler);
router.get('/', getBookmarkHandler);

export default router;