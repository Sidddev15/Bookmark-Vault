import express from "express";

const app = express();

//Parse incoming JSON
app.use(express.json());

export default app;