import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import webScrapper from "./routes/webScrapper.route";
import cors from "cors";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;



app.use(cors());
app.use(express.json());
app.use("/scrapper", webScrapper);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScrip Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});