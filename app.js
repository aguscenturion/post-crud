import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import 'dotenv/config';

import { postRouter } from './src/routes/post.routes.js';
import { startDb } from './src/config/database.js';
import { fileURLToPath } from 'node:url';

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use('/', postRouter);

app.use((req,res) => {
  res.status(404).send('<h2>404 - Page Not Found</h2>')
});


app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
  startDb();
});
