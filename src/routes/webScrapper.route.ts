import express from "express";
import { scrappWeb } from "../controller/scrapWeb";
const router = express.Router();

router.get("/", scrappWeb);


export default router;
