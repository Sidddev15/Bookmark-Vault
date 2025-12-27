import express from "express";
import bookmarkRoutes from './modules/bookmarks/bookmark.routes.js';
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

//Parse incoming JSON
app.use(express.json());

app.use('/api/bookmarks', bookmarkRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware)

export default app;