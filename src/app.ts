import 'reflect-metadata';
import express, { Router } from 'express';
import './database';
import createConnection from './database'
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());
app.use(router);

export { app };